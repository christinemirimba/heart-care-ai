import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            to="/how-it-works"
            className="text-base font-medium text-foreground hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            How It Works
          </Link>
          <Link
            to="/about"
            className="text-base font-medium text-foreground hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            to="/faq"
            className="text-base font-medium text-foreground hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            FAQ
          </Link>
          <Link
            to="/contact"
            className="text-base font-medium text-foreground hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Log In
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setOpen(false)}>
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
