import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import logoWhite from '@/assets/logo-white.png';
import liderSvg from '@/assets/lider.svg';
import lideradoSvg from '@/assets/liderado.svg';

export default function Login() {
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
          description: 'Redirecionando para o dashboard...'
        });
        navigate('/');
      } else {
        toast({
          title: 'Erro ao fazer login',
          description: 'Email ou senha incorretos. Tente novamente.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Ocorreu um erro inesperado. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setIsLoading(true);

    try {
      const success = await login(userEmail, userPassword);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: 'radial-gradient(circle at bottom, #012873 0%, #000303 80%)'
      }}
    >
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Login Form */}
        <Card className="bg-[rgba(9,15,36,0.8)] backdrop-blur-xl border-white/10">
          <CardHeader className="text-center">
            <img src={logoWhite} alt="Orbitta" className="h-8 mx-auto mb-4" />
            <CardTitle className="text-2xl">Bem-vindo ao ORBITTA</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
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
              </div>
              <div className="space-y-2">
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
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#012873] to-[#e09f7d] hover:shadow-xl transition-all"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-muted-foreground text-center mb-3">
                Acesso rápido para demonstração:
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleQuickLogin('ana.lider@gmail.com', 'ana@123')}
                  disabled={isLoading}
                >
                  Entrar como Líder
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleQuickLogin('bea.santos@gmail.com', 'bea@123')}
                  disabled={isLoading}
                >
                  Entrar como Liderado
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm text-[#E09F7D] hover:underline"
              >
                ← Voltar para a página inicial
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="space-y-6">
          <Card className="bg-[rgba(9,15,36,0.8)] backdrop-blur-xl border-white/10">
            <CardContent className="pt-6 flex items-center gap-4">
              <img src={liderSvg} alt="Líder" className="w-20 h-20" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Acesso de Líder</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize e gerencie competências de toda a equipe
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[rgba(9,15,36,0.8)] backdrop-blur-xl border-white/10">
            <CardContent className="pt-6 flex items-center gap-4">
              <img src={lideradoSvg} alt="Liderado" className="w-20 h-20" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Acesso de Liderado</h3>
                <p className="text-sm text-muted-foreground">
                  Acompanhe seu desenvolvimento pessoal e competências
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
