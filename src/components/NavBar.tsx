import { toggleTheme } from "@/context/slices/themeSlice";
import { useAppSelector } from "@/hook/redux";
import { FaBell, FaMicrophone, FaSearch, FaShoppingCart } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Input } from "./ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { RootState } from "@/context/store";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const currentTheme = useAppSelector((state) => state.theme.theme);
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const totalItem = cartItem.length;

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Categories", path: "/Categories" },
    { title: "Product", path: "/Product" },
    { title: "Contact", path: "/Contact" },
  ];

  const icons = [{ icon: <FaBell />, path: "" }];

  const handleTheme = () => dispatch(toggleTheme());

  const [name] = useState<string>("Tony Stark");

  const menus: { path: string; link: string }[] = [
    { path: "Profile", link: "#" },
    { path: "Tracking", link: "#" },
    { path: "Admin Dashboard", link: "admin" },
    { path: "Setting", link: "#" },
  ];

  return (
    <div
      className="flex justify-between lg:justify-evenly items-center w-full
        py-2 px-4 md:px-16 lg:px-0 lg:py-2
        bg-[var(--nav-theme)]"
    >
      {/* Logo */}
      <section className="block lg:w-auto">
        <div className="w-24 h-14 lg:w-32 lg:h-16 overflow-hidden">
          <img
            src="Zipbuy-removebg-preview.png"
            alt="Logo"
            className="w-full h-full object-cover object-center scale-125"
          />
        </div>
      </section>

      {/* Nav Menu */}
      <section className="hidden lg:block">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            {/* Normal link */}
            {navigation.map((nav, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  asChild
                  className="font-semibold text-xl hover:bg-transparent
                  focus:bg-transparent hover:text-inherit focus:text-inherit"
                >
                  <Link to={nav.path}>{nav.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </section>

      {/* Search Bar */}
      <section className="flex w-2/3 lg:w-1/4 items-center space-x-4">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900/50" />
          <Input
            type="text"
            placeholder="Search"
            className="bg-white pl-10 pr-4 py-2"
          />
        </div>
        <FaMicrophone className="text-xl opacity-75" />
      </section>

      {/* Icons & Profile */}
      <section className="hidden lg:flex items-center justify-between space-x-4">
        <ul className="flex h-full items-center space-x-4">
          {icons.map((link, index) => (
            <Link to={link.path} key={index} className="text-2xl">
              {link.icon}
            </Link>
          ))}
          <Link to="/Cart" className="relative text-2xl">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItem}
            </span>
          </Link>
          <button onClick={handleTheme} className="text-2xl cursor-pointer">
            {currentTheme === "light" ? <MdDarkMode /> : <MdLightMode />}
          </button>
        </ul>

        <aside>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center justify-between space-x-2">
                <h1 className="text-xl font-semibold">{name}</h1>
                <aside className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src="Tony-Stark.webp"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </aside>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {menus.map((menu, index) => (
                <DropdownMenuItem key={index}>
                  <Link to={menu.link}>{menu.path}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </aside>
      </section>
    </div>
  );
};

export default NavBar;
