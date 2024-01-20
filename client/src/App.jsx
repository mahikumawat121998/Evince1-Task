import React from "react";
import Home from "./page/home/home";
import About from "./page/about/about";
import Update from "./page/update/Update";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    
    {
      path: "/about",
      element: <About/>,
    },
    {
      path: "/update/:id",
      element: <Update/>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
