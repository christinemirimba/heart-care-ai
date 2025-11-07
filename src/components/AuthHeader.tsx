import { Heart, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const AuthHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = location.pathname.includes("/history")
    ? "history"
    : location.pathname.includes("/settings")
    ? "settings"
    : "assessment";

  const handleTabChange = (value: string) => {
    switch (value) {
      case "assessment":
        navigate("/assessment");
        break;
      case "history":
        navigate("/history");
        break;
      case "settings":
        navigate("/settings");
        break;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/assessment" className="flex items-center space-x-2 transition-transform hover:scale-105">
          <Heart className="h-7 w-7 fill-primary text-primary" />
          <span className="text-xl font-bold">
            Heartcare <span className="text-primary">AI</span>
          </span>
        </Link>

        <Tabs value={currentTab} onValueChange={handleTabChange} className="hidden md:block">
          <TabsList className="bg-primary/10">
            <TabsTrigger 
              value="assessment" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Risk Assessment
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              History
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/20 text-primary">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-medium">{user?.username || "User"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.username}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <User className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden border-t border-border/40">
        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full rounded-none bg-transparent h-12">
            <TabsTrigger 
              value="assessment" 
              className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              Assessment
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              History
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};
