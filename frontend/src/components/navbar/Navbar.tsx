import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const mobileStyles = "flex w-full items-center py-2 text-lg font-semibold";
  const desktopStyles =
    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50";

  const links = [
    { text: "Repository", to: "https://github.com/DEadMan10sds/TSExpress" },
    { text: "Documentación", to: "/" },
  ];

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <NavLink className="mr-6 hidden lg:flex" to="/">
            <MainIcon className="h-6 w-6" />
          </NavLink>
          <div className="grid gap-2 py-6">
            {links.map((link) => {
              return (
                <NavLink key={link.text} to={link.to} className={mobileStyles}>
                  {link.text}
                </NavLink>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
      <NavLink className="mr-6 hidden lg:flex" to="#">
        <MainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </NavLink>
      <nav className="ml-auto hidden lg:flex gap-6">
        {links.map((link) => {
          return (
            <NavLink key={link.text} to={link.to} className={desktopStyles}>
              {link.text}
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MainIcon(props: any) {
  return (
    <div>
      <img
        src="https://avatars.githubusercontent.com/u/54693096?s=400&u=36cb9393cce4a1dd7a6eab095f3c92d2f22dab24&v=4"
        className="size-10"
      />
    </div>
  );
}
