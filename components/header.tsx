import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartIconButton } from "./CartIconButton";
import { Button } from "./ui/button";
import { LogoutButton } from "./ui/logoutButton";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
const Header = async ({ header }: { header: any }) => {
  const { siteTitle, siteLogoUrl, siteDescription, favicon, headerMenuItems } =
    header;
  const session = await getServerSession(options);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">{siteTitle}</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {headerMenuItems.map((item: any) => (
            <div key={item.ID}>
              <Link className="mr-5 hover:text-gray-900" href={item.url}>
                {item.title}
              </Link>
            </div>
          ))}
          {session && (
            <Link className="mr-5 hover:text-gray-900" href={"/my-account"}>
              My Account
            </Link>
          )}
        </nav>
        <div className="flex py-2 md:py-0 items-center justify-between space-x-4">
          <CartIconButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
