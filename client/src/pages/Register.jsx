import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};

export default function Register() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4> Register</h4>
        <FormRow labelText="name" type="text" name="name" defaultValue="siva" />
        <FormRow
          labelText="last Name"
          type="text"
          name="lastName"
          defaultValue="sankar"
        />
        <FormRow
          labelText="location"
          type="text"
          name="location"
          defaultValue="india"
        />
        <FormRow
          labelText="email"
          type="email"
          name="email"
          defaultValue="sankarsiva018@gmail.com"
        />
        <FormRow
          labelText="password"
          type="password"
          name="password"
          defaultValue="scret123"
        />

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <p>
          Already a member
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}
