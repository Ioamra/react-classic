import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import { ThemeSwitch } from "./theme-switch";
import { SearchIcon } from "./icons/search-icon";
import { Logo } from "./icons/logo";
import { TwitterIcon } from "./icons/twitter-icon";
import { DiscordIcon } from "./icons/discord-icon";
import { GithubIcon } from "./icons/github-icon";

export const Navbar = () => {
  const accessToken = localStorage.getItem('accessToken');

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
            <NavbarItem key="/">
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href="/"
              >
                Home
              </Link>
            </NavbarItem>
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href="https://github.com/Ioamra/react-classic/tree/nextui">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          {searchInput}
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-4">
          {accessToken ? (
            <></> // TODO : Ajouter un icon user
          ) : (
            <>
              <Button
                as={Link}
                href="/login"
                variant="flat"
              >
                Connexion
              </Button>
              <Button
                as={Link}
                href="/login"
                variant="flat"
              >
                Inscription
              </Button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href="https://github.com/Ioamra/react-classic/tree/nextui">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem key="/">
            <Link
              color="primary"
              href="#"
              size="lg"
            >
              Home
            </Link>
          </NavbarMenuItem>
          {accessToken ? (
            <NavbarMenuItem key="/profile">
              <Link
                color="primary"
                href="#"
                size="lg"
                >
                Profil
              </Link>
            </NavbarMenuItem>
          ) : (
            <>
              <NavbarMenuItem key="/login">
                <Link
                  color="primary"
                  href="#"
                  size="lg"
                  >
                  Connexion
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem key="/register">
                <Link
                  color="primary"
                  href="#"
                  size="lg"
                  >
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
