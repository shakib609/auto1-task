import { RouteObject } from "react-router-dom";
import Root from "./Root";
import SearchPage from "./SearchPage";
import FavoritesPage from "./FavoritesPage";
import CarDetailsPage from "./CarDetailsPage";
import ErrorPage from "./ErrorPage";
import DefaultLayout from "../layouts/DefaultLayout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <DefaultLayout>
        <ErrorPage />
      </DefaultLayout>
    ),
    children: [
      {
        path: "/",
        element: <SearchPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
      {
        path: "/details/:stockNumber",
        element: <CarDetailsPage />,
      },
    ],
  },
];

export default routes;
