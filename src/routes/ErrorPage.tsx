import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  return <h1>Error</h1>;
};

export default ErrorPage;
