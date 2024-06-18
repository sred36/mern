import { nanoid } from "nanoid";
import { StatusCodes } from "http-status-codes";
import JobModel from "../Models/JobModel.js";

import mongoose from "mongoose";
import day from "dayjs";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await JobModel.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await JobModel.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await JobModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  let { id } = req.params;
  const job = await JobModel.findById(id);

  //   if (!job) {
  //     throw new NotFoundError(`no job with id : ${id}`);
  //     // res.status(400).json({ message: `requested ${id} not found` });
  //   }

  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  let { id } = req.params;
  let job = await JobModel.findByIdAndUpdate(id, req.body, { new: true });
  //   if (!job) {
  //     throw new NotFoundError(`no job with id : ${id}`);
  //   }
  res
    .status(StatusCodes.OK)
    .json({ message: "job has been modified", job: job });
};

export const deleteJob = async (req, res) => {
  let { id } = req.params;
  let job = await JobModel.findByIdAndDelete(id);
  //   if (!job) {
  //     throw new NotFoundError(`no job with id : ${id}`);
  //   }
  //   let newJObs = jobs.filter((job) => job.id !== id);
  //   jobs = newJObs;
  res
    .status(StatusCodes.OK)
    .json({ message: "job has been deleted", job: job });
};

export const showStats = async (req, res) => {
  let stats = await JobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await JobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
