import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts/main/MainLayout";
import { Home } from "./pages/Home/Home";
import { InformationDisplay } from "./components/informationDisplay/informationDisplay.tsx";
import { content } from "./data/data.ts";
import { JwtComponent } from "./pages/jwt/Jwt.tsx";
import { Information } from "./interfaces/InformationDisplay.ts";

const routes = content.map((value) => {
  const currentData: Information[] = value.data as Information[];
  if (value.text === "Home")
    return {
      index: true,
      element: <InformationDisplay data={currentData} />,
    };

  return {
    path: value.to,
    element: <InformationDisplay data={currentData} />,
  };
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <Home />,
        children: routes,
      },
      {
        path: "/*",
        element: <JwtComponent />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
