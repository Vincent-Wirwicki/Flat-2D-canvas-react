import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import TheWallPage from "./pages/TheWallPage";
import ConstellationPage from "./pages/ConstellationPage";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { element: <HomePage />, path: "/" },
        { element: <TheWallPage />, path: "/thewall" },
        { element: <ConstellationPage />, path: "/constellation" },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
