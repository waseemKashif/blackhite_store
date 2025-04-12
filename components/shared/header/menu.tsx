import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import { EllipsisVertical, ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserButton from "./user-button-avatar";
import { Badge } from "@/components/ui/badge";
import { getMyCart } from "@/lib/actions/cart.actions";
const Menu = async () => {
const cart = await getMyCart();
const totalItems = cart?.items?.length ?? 0;

  return (
    <div className="flex  justify-end gap-3">
      <nav className=" hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href="/cart" className="relative">
            <ShoppingCart />
            Cart
            {totalItems && totalItems > 0 ? (
              <Badge variant="destructive" className=" absolute top-0 right-0">
                {cart?.items.reduce((acc, item) => acc + item.qty, 0)} 
              </Badge>
            ) : (
              ""
            )}
          </Link>
        </Button>
        <UserButton />
      </nav>
      <nav className=" md:hidden">
        <Sheet>
          <SheetTrigger className="  align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className=" flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <Button asChild variant="ghost">
              <Link href="/cart">
                <ShoppingCart /> cart{" "}
              </Link>
            </Button>
            <UserButton />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
