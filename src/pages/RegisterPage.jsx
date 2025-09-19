import React, { useState, useEffect } from 'react';
import { UserPlus, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { registerAPI, saveTokens } from '../api/auth'; // Adjust the import path as necessary

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
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

 const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const data = await registerAPI({ username: name, email, password });
    if (data.access && data.refresh) {
      saveTokens({ access: data.access, refresh: data.refresh });
    }
    alert("✅ Registered Successfully!");
    navigate("/dashboardpage");
  } catch (err) {
    console.error("Register error:", err);
    const msg = err.username ? err.username[0] : err.email ? err.email[0] : err.detail || JSON.stringify(err);
    alert("❌ Error: " + (msg || "Something went wrong"));
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center">
      {/* Particle background */}
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

      {/* Registration form */}
      <div className="relative z-10 max-w-md w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mb-4 shadow-lg">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-white/60">Sign up to access your secure vault</p>
        </div>

        <form className="space-y-6" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Sign Up
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </form>

        <div className="mt-6 text-center text-white/60 text-sm">
          Already have an account?{' '}
          <button
            className="text-cyan-400 hover:text-cyan-300 ml-1"
            onClick={() => navigate('/login')}
          >
            Sign in here
          </button>
        </div>
      </div>

      {/* Particle animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px) rotate(180deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
