import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const NotFound = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div 
      className="flex min-h-screen items-center justify-center"
      style={{
        background: 'radial-gradient(circle at bottom, #012873 0%, #000303 80%)'
      }}
    >
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="text-2xl text-white/80">Página não encontrada</p>
        <p className="text-white/60">A página que você está procurando não existe.</p>
        <Link to={isAuthenticated ? "/" : "/landing"}>
          <Button className="bg-gradient-to-r from-[#012873] to-[#e09f7d] hover:shadow-xl transition-all">
            {isAuthenticated ? 'Voltar ao Dashboard' : 'Voltar à Página Inicial'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
