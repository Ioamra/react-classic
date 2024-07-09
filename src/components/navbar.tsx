import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Navbar as NextUINavbar } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import { GithubIcon } from "./icons/github-icon";
import { Logo } from "./icons/logo";
import { SearchIcon } from "./icons/search-icon";
import { UserIcon } from "./icons/user-icon";
import { ThemeSwitch } from "./theme-switch";

interface NavbarProps {
  openModal: (tab: "login" | "register") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ openModal }) => {
  const accessToken = localStorage.getItem("accessToken");

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={<SearchIcon className="text-base text-default-500 pointer-events-none flex-shrink-0" />}
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-1" color="foreground" href="/">
            <Logo size={50} />
            <p className="font-bold text-inherit">ACME</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          <NavbarItem key="/">
            <Link className={clsx(linkStyles({ color: "foreground" }), "data-[active=true]:text-primary data-[active=true]:font-medium")} color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
        </div>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href="https://github.com/Ioamra/react-classic/tree/nextui">
            <GithubIcon size={30} className="text-default-500" />
          </Link>
          <ThemeSwitch />
          {searchInput}
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-4">
          {accessToken ? (
            <Link href="/profile" size="lg">
              <UserIcon size={32} className="text-default-500" />
            </Link>
          ) : (
            <>
              <Button onPress={() => openModal("login")} variant="flat">
                Connexion
              </Button>
              <Button onPress={() => openModal("register")} variant="flat">
                Inscription
              </Button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href="https://github.com/Ioamra/react-classic/tree/nextui">
          <GithubIcon size={30} className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem key="/">
            <Link color="primary" href="#" size="lg">
              Home
            </Link>
          </NavbarMenuItem>
          {accessToken ? (
            <NavbarMenuItem key="/profile">
              <Link color="primary" href="/profile" size="lg">
                Profil
              </Link>
            </NavbarMenuItem>
          ) : (
            <>
              <NavbarMenuItem key="/login">
                <Link color="primary" href="#" size="lg" onPress={() => openModal("login")}>
                  Connexion
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem key="/register">
                <Link color="primary" href="#" size="lg" onPress={() => openModal("register")}>
                  Inscription
                </Link>
              </NavbarMenuItem>
            </>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
