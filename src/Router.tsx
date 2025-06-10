import { Route, Routes } from "react-router-dom";
import App from "./App";
import Admin from "./Admin";
import Home from "./page/Home";
import Product from "./page/Product";
import Categories from "./page/Categories";
import Build from "./page/Build";
import Custom from "./page/Custom";
import Profile from "./page/Profile";
import Cart from "./page/Cart";
import type { JSX } from "react";

interface RouterInterface {
  path: string;
  link: JSX.Element;
}

const Router = () => {
  const Users: RouterInterface[] = [
    { path: "Categories", link: <Categories /> },
    { path: "Product", link: <Product /> },
    { path: "Build", link: <Build /> },
    { path: "Custom", link: <Custom /> },
    { path: "Profile", link: <Profile /> },
    { path: "Cart", link: <Cart /> },
  ];

  return (
    <Routes>
      {/* User */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        {Users.map((user, index) => (
          <Route key={index} path={user.path} element={user.link} />
        ))}
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default Router;
