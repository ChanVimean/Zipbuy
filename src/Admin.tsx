import { useEffect } from "react";
import { loadTheme } from "./context/slices/themeSlice";
import { useAppDispatch, useAppSelector } from "./hook/redux";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AdminSideBar from "./components/AdminSideBar";

const Admin = () => {
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
    <div>
      <aside className="w-1/6 border-r">
        <SidebarProvider>
          <SidebarTrigger />
          <AdminSideBar />
        </SidebarProvider>
      </aside>

      <section className="5/6">
        <Outlet />
      </section>
    </div>
  );
};

export default Admin;
