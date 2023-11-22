import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

const SideModal = ({
  children,
  triggerButton,
  open,
}: {
  children: React.ReactNode;
  triggerButton: any;
  open: boolean;
}) => {
  return (
    <Sheet>
      <SheetTrigger>{triggerButton}</SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>{children}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SideModal;
