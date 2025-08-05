import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hook/redux";
import { loadTheme } from "./context/slices/themeSlice";
import Footer from "./components/Footer";
import BottomBar from "./components/BottomBar";
import useSyncLocalData from "./hook/useSyncLocalData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { breadcrumbMap } from "./utils/breadcrumbMap";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const colors = useAppSelector((state) => state.theme.colors[theme]);

  useSyncLocalData();

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

  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="relative font-poppins bg-[var(--bg-theme)] text-[var(--text-theme)]">
      <nav className="w-full">
        <aside className="sticky-top top-0 z-50 w-full">
          <NavBar />
        </aside>

        <aside className="fixed lg:hidden w-full bottom-0 z-50">
          <BottomBar />
        </aside>
      </nav>

      <main className="md:px-8 lg:px-24">
        <Breadcrumb className="mt-4 mb-6 text-[var(--text-theme)]">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-[var(--breadcrumb-text)] hover:text-[var(--breadcrumb-hover)]"
              >
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {pathSegments.map((segment, index) => {
              const fullPath = "/" + pathSegments.slice(0, index + 1).join("/");
              const isLast = index === pathSegments.length - 1;
              const label =
                breadcrumbMap[segment.toLowerCase()] ||
                decodeURIComponent(segment);

              return (
                <React.Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="font-semibold text-[var(--breadcrumb-page)] capitalize">
                        {label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link
                          to={fullPath}
                          className="font-semibold text-[var(--breadcrumb-page)] capitalize"
                        >
                          {label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
