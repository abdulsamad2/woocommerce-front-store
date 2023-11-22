import { MenuSquare, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartIconButton } from "./CartIconButton";
import { Button } from "./ui/button";
import { LogoutButton } from "./ui/logoutButton";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Separator } from "./ui/separator";

import SideModal from "./ui/sideModal";
import { SheetClose } from "./ui/sheet";

const Header = async ({ header }: { header: any }) => {
  const { siteTitle, siteLogoUrl, siteDescription, favicon, headerMenuItems } =
    header;
  const session = await getServerSession(options);
  const navMenu = headerMenuItems.map((item: any) => (
    <div className="" key={item.ID}>
      <Link className="md:mr-5  hover:text-gray-900" href={item.url}>
        {item.title}
      </Link>
    </div>
  ));
  return (
    <header className="text-gray-600 relative body-font">
      <div className="container  justify-between mx-auto flex  p-5  md:flex-row items-center">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-md md:text-xl">{siteTitle}</span>
        </Link>
        <nav className="md:ml-auto  hidden md:flex flex-wrap items-center text-base justify-center">
          {navMenu}
          {session && (
            <Link className="mr-5 hover:text-gray-900" href={"/my-account"}>
              My Account
            </Link>
          )}
        </nav>
        <div className="flex py-2 md:py-0 items-center justify-between space-x-4">
          <CartIconButton />

          <div className="hidden md:block">
            <LogoutButton />
          </div>
          <div className="md:hidden cursor-pointer p-1 bg-slate-200 hover:bg-slate-300 active:bg-slate-200  ">
            <SideModal
              menuItems={headerMenuItems}
              triggerButton={<MenuSquare size={36} className="text-gray" />}
            >
              <div className="my-5">
                <LogoutButton />
              </div>
            </SideModal>
          </div>
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default Header;
