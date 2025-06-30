import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hook/redux";
import { loadTheme } from "./context/slices/themeSlice";
import Footer from "./components/Footer";
import BottomBar from "./components/BottomBar";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const colors = useAppSelector((state) => state.theme.colors[theme]);

  useEffect(() => {
    dispatch(loadTheme());
  }, [dispatch]);

  useEffect(() => {
    const root = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}-color`, value);
    });

    // ? Optional: add dark class for CSS styling
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme, colors]);

  return (
    <div className="relative font-poppins bg-[var(--bg-theme)] text-[var(--text-theme)]">
      <nav className="fixed-top">
        <NavBar />
        <aside className="fixed lg:hidden w-full bottom-0 z-50">
          <BottomBar />
        </aside>
      </nav>

      <main className="md:px-8 lg:px-36">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
