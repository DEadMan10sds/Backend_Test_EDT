import { WithSidebar } from "@/components/sideBar/SideBar";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { content } from "@/data/data";
import { Button } from "@/components/ui/button";

export function Home() {
  const CustomHeader = () => {
    return (
      <div className="flex px-4">
        <span className="text-2xl font-extrabold">Index</span>
      </div>
    );
  };

  const SidebarContent = () => {
    return (
      <div>
        <CustomHeader />
        <div className="mt-6">
          {content.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className="block rounded px-4 py-2.5 transition duration-200 hover:bg-cyan-900"
            >
              {item.text}
            </NavLink>
          ))}
          <a
            href="/EDT-Test-Backend.postman_collection.json"
            download="PostmanCollection"
          >
            <Button className="block rounded px-4 py-2.5 transition duration-200 hover:bg-cyan-900">
              Postman Collection
            </Button>
          </a>
        </div>
      </div>
    );
  };

  return (
    <main>
      <WithSidebar
        sidebarContent={SidebarContent}
        mobileDashboardHeader={CustomHeader}
      >
        <Outlet />
      </WithSidebar>
    </main>
  );
}
