import type { JSX } from "react";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { MdCategory } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

type LinkTypes = {
  title: string;
  icon: JSX.Element;
  path: string;
};

const BottomBar = () => {
  const links: LinkTypes[] = [
    { title: "Home", icon: <TiHome />, path: "/" },
    { title: "Categories", icon: <MdCategory />, path: "/Categories" },
    { title: "Product", icon: <AiFillProduct />, path: "/Product" },
    { title: "Cart", icon: <FaShoppingCart />, path: "/Cart" },
    { title: "Profile", icon: <IoPersonSharp />, path: "/Profile" },
  ];

  return (
    <div className="w-full bg-[var(--nav-theme)] py-2 md:py-6">
      <ul className="flex justify-evenly">
        {links.map((link, index) => (
          <li key={index} className="flex flex-col items-center space-y-2">
            <Link to={link.path} className="text-2xl md:text-3xl">
              {link.icon}
            </Link>
            <h3 className="text-sm md:text-lg">{link.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomBar;
