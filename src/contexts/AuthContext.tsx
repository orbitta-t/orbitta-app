import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'LIDER' | 'LIDERADO';

export interface User {
  email: string;
  role: UserRole;
  name: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users - preparado para futura integração com API
const MOCK_USERS = [
  {
    email: 'ana.lider@gmail.com',
    password: 'ana@123',
    role: 'LIDER' as UserRole,
    name: 'Ana Silva',
    userId: '550e8400-e29b-41d4-a716-446655440001' // ID do líder
  },
  {
    email: 'bea.santos@gmail.com',
    password: 'bea@123',
    role: 'LIDERADO' as UserRole,
    name: 'Beatriz Santos',
    userId: '550e8400-e29b-41d4-a716-446655440010' // ID da Ana Silva (liderada)
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Recuperar sessão do localStorage ao carregar
  useEffect(() => {
    const storedUser = localStorage.getItem('orbitta_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /**
   * Mock login function
   * Futuro: substituir por chamada real à API
   * ```ts
   * const response = await fetch('/api/auth/login', {
   *   method: 'POST',
   *   body: JSON.stringify({ email, password })
   * });
   * const data = await response.json();
   * ```
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name,
        userId: foundUser.userId
      };
      setUser(userData);
      localStorage.setItem('orbitta_user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('orbitta_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
