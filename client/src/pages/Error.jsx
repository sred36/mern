import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

export default function Error() {
  const errorCode = useRouteError();
  if (errorCode.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not dound" />
          <h3>Oh!! page not found</h3>
          <p>We can't seem to find the page we are looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3> something went wrong</h3>
      </div>
    </Wrapper>
  );
}
