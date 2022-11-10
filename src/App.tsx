import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FavoritesProvider from "./contexts/FavoritesContext";
import routes from "./routes";

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <div className="app">
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </div>
  );
};

export default App;
