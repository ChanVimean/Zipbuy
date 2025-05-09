import { FaBell, FaShoppingCart } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navigation = [
    { title: "Home", path: "/" },
    { title: "Categories", path: "/Categories" },
    { title: "Product", path: "/Product" },
    { title: "Build", path: "/Build" },
    { title: "Custom", path: "/Custom" },
  ];

  const icons = [<FaBell />, <FaShoppingCart />];

  return (
    <div className="flex justify-evenly w-screen py-4 bg-slate-950 text-white">
      <section>
        <ul className="flex space-x-4 text-xl font-medium">
          {navigation.map((nav, index) => (
            <li key={index}>
              <Link
                key={index}
                to={nav.path}
                className="cursor-pointer"
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <ul className="flex h-full items-center space-x-4">
          {icons.map((link, index) => (
            <li key={index} className="text-2xl">
              {link}
            </li>
          ))}
          <li className="text-2xl">
            <MdLightMode />
          </li>
        </ul>
      </section>
    </div>
  );
};

export default NavBar;
