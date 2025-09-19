// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginAPI, saveTokens } from '../api/auth'; // Adjust the import path as necessary

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(''); // Django JWT uses username by default
  const [password, setPassword] = useState('');
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 25; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4
      });
    }
    setParticles(newParticles);
  }, []);

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    // use email field as usernameOrEmail (user can type username or email)
    const data = await loginAPI({ usernameOrEmail: email, password });
    if (data.access && data.refresh) {
      saveTokens({ access: data.access, refresh: data.refresh });
    }
    alert("Login successful");
    navigate("/dashboardpage");
  } catch (err) {
    console.error("Login error:", err);
    const msg = err.detail || (Array.isArray(err.non_field_errors) ? err.non_field_errors.join(", ") : JSON.stringify(err));
    alert("Login failed: " + (msg || "Invalid credentials"));
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mb-4 shadow-lg">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-white/60">Sign in to your security dashboard</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg transition-all hover:scale-105 flex justify-center items-center"
          >
            Sign In
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
          
        </form>

        <div className="mt-6 text-center text-white/60 text-sm">
          Don't have an account?{' '}
          <button
            className="text-cyan-400 hover:text-cyan-300 ml-1"
            onClick={() => navigate('/register')}
          >
            Sign up here
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px) rotate(180deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
