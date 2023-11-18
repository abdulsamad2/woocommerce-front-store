import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartIconButton } from "./CartIconButton";

const Header = ({ header }: { header: any }) => {
  const { siteTitle, siteLogoUrl, siteDescription, favicon, headerMenuItems } =
    header;
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <Image src={siteLogoUrl || ""} width={32} height={32} alt="logo" />
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
        </nav>
        <CartIconButton />
      </div>
    </header>
  );
};

export default Header;
