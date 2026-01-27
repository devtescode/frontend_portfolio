import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { API_URLS } from '../../components/utils/apiConfig';
import axios from 'axios';

const AdminLogin = () => {
  // const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  // const [showPassword, setShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // });

  // if (isAuthenticated) {
  //   return <Navigate to="/admin" replace />;
  // }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const result = await login(formData.email, formData.password);

  //   if (result.success) {
  //     toast({
  //       title: 'Welcome back!',
  //       description: 'You have been logged in successfully.',
  //     });
  //     navigate('/admin');
  //   } else {
  //     toast({
  //       title: 'Error',
  //       description: result.error || 'Invalid credentials',
  //       variant: 'destructive',
  //     });
  //   }

  //   setLoading(false);
  // };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        API_URLS.adminlogin,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);


      toast({
        title: 'Welcome back!',
        description: response.data.message,
      });

      navigate("/admin"); // go to admin dashboard
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-primary/30 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-white font-display">P</span>
          </div>
          <h1 className="text-2xl font-bold font-display">Admin Login</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Login Form */}
        <div className="glass-card p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@portfolio.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-10 bg-background/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
