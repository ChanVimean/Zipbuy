import { toggleTheme } from "@/context/slices/themeSlice";
import { useAppSelector } from "@/hook/redux";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const currentTheme = useAppSelector((state) => state.theme.theme);

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Categories", path: "/Categories" },
    { title: "Product", path: "/Product" },
    { title: "Build", path: "/Build" },
    { title: "Custom", path: "/Custom" },
  ];

  const icons = [<FaBell />, <FaShoppingCart />];

  const handleTheme = () => dispatch(toggleTheme());

  return (
    <div
      className="flex justify-between lg:justify-evenly w-screen py-2 lg:py-4 px-4 lg:px-0
     bg-[var(--nav-theme)]"
    >
      <section className="bg-blue-500">mini map</section>

      <section className="hidden lg:block">
        <ul className="flex space-x-4 text-xl font-medium">
          {navigation.map((nav, index) => (
            <li key={index}>
              <Link key={index} to={nav.path} className="cursor-pointer">
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="hidden md:block">
        <ul className="flex h-full items-center space-x-4">
          {icons.map((link, index) => (
            <button key={index} className="text-2xl">
              {link}
            </button>
          ))}
          <button onClick={handleTheme} className="text-2xl">
            {currentTheme === "light" ? <MdDarkMode /> : <MdLightMode />}
          </button>
        </ul>
      </section>
    </div>
  );
};

export default NavBar;
