import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Cookies from "js-cookie";

export default function AppHeader() {
  return (
    <div className="flex justify-end px-4 shadow-sm shadow-black-100 ">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>User Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className={"cursor-none"}>
                HELLO KASHF FOUNDATION
              </NavigationMenuLink>
              <NavigationMenuLink
                className={"cursor-pointer"}
                onClick={() => {
                  Cookies.remove("userName");
                  Cookies.remove("userEmail");
                  window.location.href = "/login";
                }}
              >
                Logout
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
