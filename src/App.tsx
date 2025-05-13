import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Categories from "./page/Categories";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Product from "./page/Product";
import Build from "./page/Build";
import Custom from "./page/Custom";
import Profile from "./page/Profile";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hook/redux";
import { loadTheme } from "./context/slices/themeSlice";
import Footer from "./components/Footer";

const pcNav = [
  { title: "/", link: <Home /> },
  { title: "/Categories", link: <Categories /> },
  { title: "/Product", link: <Product /> },
  { title: "/Build", link: <Build /> },
  { title: "/Custom", link: <Custom /> },
  { title: "/Profile", link: <Profile /> },
];

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

    // Optional: add dark class for CSS styling
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme, colors]);

  return (
    <div className="font-poppins bg-[var(--bg-theme)] text-[var(--text-theme)]">
      <nav className="fixed-top">
        <Header />
        <NavBar />
      </nav>

      <main>
        <section>
          <Routes>
            {pcNav.map((nav, index) => (
              <Route key={index} path={nav.title} element={nav.link} />
            ))}
          </Routes>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
