import { Route, Routes } from "react-router-dom";
import App from "./App";
import Admin from "./Admin";
import Home from "./page/Home";
import Product from "./page/Product";
import Categories from "./page/Categories";
import Profile from "./page/Profile";
import Cart from "./page/Cart";
import type { JSX } from "react";
import Contact from "./page/Contact";
import ProductDetail from "./page/ProductDetail";
import Search from "./page/Search";

interface RouterInterface {
  path: string;
  link: JSX.Element;
  label: string;
}

const Router = () => {
  const Users: RouterInterface[] = [
    { path: "Categories", link: <Categories />, label: "Categories" },
    { path: "Product", link: <Product />, label: "Products" },
    { path: "Contact", link: <Contact />, label: "Contact Us" },
    { path: "Profile", link: <Profile />, label: "My Profile" },
    { path: "Cart", link: <Cart />, label: "My Cart" },
    { path: "Search", link: <Search />, label: "Search" },
    { path: "Product/:category/:id", link: <ProductDetail />, label: "Detail" }, // ! -> Require ID
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
