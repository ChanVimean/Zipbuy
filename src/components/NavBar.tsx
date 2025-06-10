import { toggleTheme } from "@/context/slices/themeSlice";
import { useAppSelector } from "@/hook/redux";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { CategoriesList } from "@/types/Product";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

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
      className="flex justify-center md:justify-between lg:justify-evenly items-center w-full
        py-2 lg:py-4 px-4 md:px-16 lg:px-0
        bg-[var(--nav-theme)]"
    >
      <section className="w-full md:w-auto text-[var(--text-theme)] border-none">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="font-semibold text-xl w-full md:w-56 bg-[var(--renav-theme)] h-auto"
            >
              Categories
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-screen md:w-56" align="start">
            <DropdownMenuGroup className="text-lg">
              {CategoriesList.map((category, index) => (
                <DropdownMenuItem key={index}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <section className="hidden lg:block">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            {/* Normal link */}
            {navigation.map((nav, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={nav.path}
                  className="font-semibold text-xl hover:bg-transparent focus:bg-transparent hover:text-inherit focus:text-inherit"
                >
                  {nav.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
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
