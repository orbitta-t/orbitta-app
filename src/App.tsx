import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DashboardLayout } from "./components/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Landing from "./pages/landing/landing.tsx";
import Login from "./pages/LoginPage/index";
import Home from "./pages/Home";
import Team from "./pages/Team";
import EvaluationList from "./pages/EvaluationList";
import Evaluation from "./pages/Evaluation";
import Settings from "./pages/Settings";
import MemberDetail from "./pages/MemberDetail";
import Compare from "./pages/Compare";
import PersonalDevelopment from "./pages/PersonalDevelopment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente para redirecionar baseado no role
function DashboardHome() {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Líderes veem o Home normal, Liderados veem Desenvolvimento Pessoal
  if (user.role === 'LIDERADO') {
    return <Navigate to="/personal-development" replace />;
  }
  
  return <Home />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardHome />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/team"
              element={
                <ProtectedRoute allowedRoles={['LIDER']}>
                  <DashboardLayout>
                    <Team />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/team/:memberId"
              element={
                <ProtectedRoute allowedRoles={['LIDER']}>
                  <DashboardLayout>
                    <MemberDetail />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/compare"
              element={
                <ProtectedRoute allowedRoles={['LIDER']}>
                  <DashboardLayout>
                    <Compare />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/personal-development"
              element={
                <ProtectedRoute allowedRoles={['LIDERADO']}>
                  <DashboardLayout>
                    <PersonalDevelopment />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/evaluation"
              element={
                <ProtectedRoute allowedRoles={['LIDER']}>
                  <DashboardLayout>
                    <EvaluationList />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/evaluation/:memberId"
              element={
                <ProtectedRoute allowedRoles={['LIDER']}>
                  <DashboardLayout>
                    <Evaluation />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
