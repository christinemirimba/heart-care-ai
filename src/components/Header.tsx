import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
          <Heart className="h-7 w-7 fill-primary text-primary" />
          <span className="text-xl font-bold">
            Heart<span className="text-primary">CareAI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate("/login")}>
            Log In
          </Button>
          <Button onClick={() => navigate("/signup")} className="shadow-md hover:shadow-lg transition-shadow">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};
