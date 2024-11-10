import { Link, useRouteError } from "react-router-dom";

const SpacecraftError = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h2>Oops! Something went wrong.</h2>

      <p>
        {error?.statusText || error?.message || "An unexpected error occurred."}
      </p>
      <Link to="/">Back to the Homepage</Link>
    </div>
  );
};

export default SpacecraftError;
