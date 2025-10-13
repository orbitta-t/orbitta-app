
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import './LoginPage.css'; 
import LeftPanel from '../../components/LeftPanel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


function StarsBackground() {
  const [stars, setStars] = useState<
    { id: number; top: number; left: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 15; i++) {
        newStars.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: -Math.random() * 3,
          duration: 1 + Math.random() * 2,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animation: `shoot ${star.duration}s linear ${star.delay}s infinite`,
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]" />
        </div>
      ))}

      <style>{`
        @keyframes shoot {
          0% { transform: translate(0, 0); opacity: 0; }
          10%, 90% { opacity: 1; }
          100% { transform: translate(-300px, -300px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Redirecionando para o dashboard...',
        });
        navigate('/');
      } else {
        toast({
          title: 'Erro ao fazer login',
          description: 'Email ou senha incorretos. Tente novamente.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Ocorreu um erro inesperado. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const slogan = <>Conectando talentos em<br />uma única órbita</>;

  return (
    <main className="login-page">
      <StarsBackground />
      <LeftPanel title={slogan} />
      <img className="float absolute" src="rocket.svg" />
      <section className="right-panel">
        <div className="form-container">
          <h2 className="text-red-300">Acessar plataforma</h2>

          <form onSubmit={handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />

            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />

            <a href="#" className="forgot-password">
              Esqueceu sua senha?
            </a>

            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </form>

          <div className="separator">
            <span>ou</span>
          </div>

          <button className="btn btn-secondary btn-google">
            <svg viewBox="0 0 48 48" width="24px" height="24px">
              {/* paths omitidos pra simplificar */}
            </svg>
            Continuar com o Google
          </button>

          <div className="create-account">
            <span>Quer criar a sua conta?</span>
            <a href="#">Crie sua conta</a>
          </div>
        </div>
      </section>
    </main>
  );
}
