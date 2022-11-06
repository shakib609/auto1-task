import { Outlet } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";

const Root: React.FC = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

export default Root;
