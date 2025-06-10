import { useState } from "react";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";

const Header = () => {
  const [name] = useState<string>("Tony Stark");

  const menus: { path: string; link: string }[] = [
    { path: "Profile", link: "#" },
    { path: "Tracking", link: "#" },
    { path: "Admin Dashboard", link: "admin" },
    { path: "Setting", link: "#" },
  ];

  return (
    <div className="flex items-center justify-between lg:justify-evenly px-4 lg:px-0">
      {/* Logo */}
      <section className="w-1/3 lg:w-auto">
        <div className="w-24 h-14 lg:w-32 lg:h-16 overflow-hidden">
          <img
            src="Zipbuy.png"
            alt="Logo"
            className="w-full h-full object-cover object-center scale-125"
          />
        </div>
      </section>

      {/* Search Bar */}
      <section className="flex w-2/3 lg:w-1/3 items-center space-x-4">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--primary-theme)] opacity-50" />
          <Input type="text" placeholder="Search" className="pl-10 pr-4 py-2" />
        </div>
        <FaMicrophone className="text-xl text-[var(--primary-theme)] opacity-75" />
      </section>

      {/* Drop Menu */}
      <section className="hidden lg:block">
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
      </section>
    </div>
  );
};

export default Header;
