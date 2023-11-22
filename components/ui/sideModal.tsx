"use client";
import React, { useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";

const SideModal = ({
  children,
  menuItems,
  triggerButton,
}: {
  children: React.ReactNode;
  menuItems: any;
  triggerButton: any;
}) => {
  const [isopen, setIsOpen] = React.useState(false);
  const navMenu = menuItems.map((item: any) => (
    <div onClick={() => setIsOpen(false)} className=" py-2" key={item.ID}>
      <Link className="md:mr-5  hover:text-gray-900" href={item.url}>
        {item.title}
      </Link>
    </div>
  ));
  return (
    <Sheet open={isopen} onOpenChange={setIsOpen}>
      <SheetTrigger>{triggerButton}</SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            <div>
              {navMenu}
              {children}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SideModal;
