import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries();
      toast.success("Login successful");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

export default function Login() {
  const errors = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("take a test drive");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      {errors && <p style={{ color: "red" }}>{errors.msg}</p>}
      <Form method="post" className="form">
        <Logo />
        <h4>Login </h4>
        <FormRow type="email" name="email" labelText="email" />
        <FormRow type="password" name="password" labelText="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <button type="submit" className="btn btn-block" onClick={loginDemoUser}>
          Explore the App
        </button>

        <p>
          Not a member yet
          <Link to="/register" className="member-btn">
            Regiser
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}
