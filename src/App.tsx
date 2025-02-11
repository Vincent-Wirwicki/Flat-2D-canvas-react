import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import TheWallPage from "./pages/TheWallPage";
import ConstellationPage from "./pages/ConstellationPage";
import LabPage from "./pages/LabPage";
import WaveGifPage from "./pages/WaveGifPage";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { element: <HomePage />, path: "/" },
        { element: <LabPage />, path: "/lab" },
        { element: <TheWallPage />, path: "/thewall" },
        { element: <ConstellationPage />, path: "/constellation" },
        { element: <WaveGifPage />, path: "/wavegif" },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
