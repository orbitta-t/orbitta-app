import { Home, Users, ClipboardCheck, LogOut, Settings, TrendingUp, BarChart3 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/landing");
  };

  // Filtrar items baseado no role do usuário
  const allNavItems = [
    { to: "/", icon: Home, label: "Home", roles: ['LIDER'] },
    { to: "/team", icon: Users, label: "Liderados", roles: ['LIDER'] },
    { to: "/compare", icon: BarChart3, label: "Comparar", roles: ['LIDER'] },
    { to: "/evaluation", icon: ClipboardCheck, label: "Avaliação", roles: ['LIDER'] },
    { to: "/personal-development", icon: TrendingUp, label: "Meu Desenvolvimento", roles: ['LIDERADO'] },
    { to: "/settings", icon: Settings, label: "Configurações", roles: ['LIDER', 'LIDERADO'] },
  ];

  const navItems = allNavItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border flex justify-center">
        <img src={logo} alt="ORBITTA" className="h-12 w-auto" />
      </div>

      <div className="flex-1 p-4">
        {user && (
          <div className="mb-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-sm font-semibold text-accent-foreground">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/70 truncate capitalize">
                  {user.role.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("w-5 h-5", !isActive && "dark:text-accent")} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200"
        >
          <LogOut className="w-5 h-5 dark:text-accent" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};
