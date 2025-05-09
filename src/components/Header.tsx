import { useState } from "react";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { Input } from "./ui/input";

const Header = () => {
  const [name] = useState<string>("Tony Stark");

  return (
    <div className="flex items-center justify-between lg:justify-evenly px-4 lg:px-0">
      <section className="w-1/3 lg:w-auto">
        <div className="w-24 h-14 lg:w-32 lg:h-16 overflow-hidden">
          <img
            src="Zipbuy.png"
            alt="Logo"
            className="w-full h-full object-cover object-center scale-125"
          />
        </div>
      </section>

      <section className="flex w-2/3 lg:w-1/3 items-center space-x-4">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input type="text" placeholder="Search" className="pl-10 pr-4 py-2" />
        </div>
        <FaMicrophone className="text-xl text-gray-600" />
      </section>

      <section className="hidden lg:flex items-center justify-between space-x-2">
        <h1 className="text-xl font-semibold">{name}</h1>
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img
            src="Tony-Stark.webp"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default Header;
