import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Categories from "./page/Categories";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Product from "./page/Product";
import Build from "./page/Build";
import Custom from "./page/Custom";
import Profile from "./page/Profile";
import { useAppDispatch, useAppSelector } from "./hook/redux";

const pcNav = [
  { title: "/", link: <Home /> },
  { title: "/Categories", link: <Categories /> },
  { title: "/Product", link: <Product /> },
  { title: "/Build", link: <Build /> },
  { title: "/Custom", link: <Custom /> },
  { title: "/Profile", link: <Profile /> },
];

const App: React.FC = () => {

  const themeDispatch = useAppDispatch()
  const themeSelector = useAppSelector(state => state.theme.theme)

  return (
    <div className="font-poppins">
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

      <footer></footer>
    </div>
  );
};

export default App;
