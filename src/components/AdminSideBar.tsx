import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { MdDashboard } from "react-icons/md";

const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: MdDashboard,
  },
  {
    title: "Dashboard",
    url: "/admin",
    icon: MdDashboard,
  },
  {
    title: "Dashboard",
    url: "/admin",
    icon: MdDashboard,
  },
    {
    title: "Dashboard",
    url: "/admin",
    icon: MdDashboard,
  },
];

const AdminSideBar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSideBar;
