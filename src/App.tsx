import { Outlet, useLocation, useParams } from "react-router-dom";
import NavBar from "./components/NavBar";
import React, { useEffect, useMemo } from "react";
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
import StickyNavWrapper from "./components/StickyNavWrapper";

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
  const { category, id } = useParams<{ category?: string; id?: string }>();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // ? Function to get product name from localStorage
  const getProductName = (category?: string, id?: string) => {
    if (!category || !id) return undefined;
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const product = products.find(
      (p: { id: number; categories: string; name: string }) =>
        p.id === Number(id) &&
        p.categories.toLowerCase() === category.toLowerCase()
    );
    return product?.name;
  };

  const productName =
    (location.state as { productName?: string })?.productName ||
    getProductName(category, id);

  // ? Function to get breadcrumb label

  const breadcrumbSegments = useMemo(() => {
    const getLabel = (segment: string): string => {
      if (segment.toLowerCase() === category?.toLowerCase()) return "Product";
      if (!isNaN(Number(segment)) && productName) return productName;
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    };
    return pathSegments
      .filter(
        (seg) => !(seg.toLowerCase() === "product" && pathSegments.length > 1)
      )
      .map((segment, index) => {
        const fullPath = "/" + pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;
        const label = getLabel(segment);

        return { fullPath, isLast, label };
      });
  }, [pathSegments, category, productName]);

  return (
    <div className="relative font-poppins bg-[var(--bg-theme)] text-[var(--text-theme)]">
      <nav className="w-full">
        <StickyNavWrapper>
          <NavBar />
        </StickyNavWrapper>

        <aside className="fixed lg:hidden w-full bottom-0 z-50">
          <BottomBar />
        </aside>
      </nav>

      <main className="px-2 md:px-8 lg:px-24 py-20">
        <Breadcrumb className="text-[var(--text-theme)] my-2 lg:my-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-[var(--breadcrumb-text)] hover:text-[var(--breadcrumb-hover)]"
              >
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {breadcrumbSegments.map(({ fullPath, isLast, label }, index) => (
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
            ))}
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
