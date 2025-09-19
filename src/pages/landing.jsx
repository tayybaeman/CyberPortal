// src/pages/Landing.jsx
import React, { useState, useEffect } from 'react';
import { Shield, Lock, Zap, Users, CheckCircle, Globe, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const [particles, setParticles] = useState([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
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

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                SecureVault
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-cyan-400">Features</a>
              <a href="#security" className="text-white/80 hover:text-cyan-400">Security</a>
              <a href="#pricing" className="text-white/80 hover:text-cyan-400">Pricing</a>
              <button
                onClick={() => navigate('/register')}
                className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:scale-105 transition-all"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center pt-40 pb-24 px-4">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Your Data, Fully Secured
        </h1>
        <p className="mt-4 text-white/70 max-w-xl">
          SecureVault is a modern solution to manage and protect your critical digital assets with military-grade encryption and real-time monitoring.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6 bg-black/10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Top-Notch Security Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left mt-8">
            <Feature icon={<Lock />} title="End-to-End Encryption" desc="Your data is encrypted at every stage to ensure full confidentiality." />
            <Feature icon={<Zap />} title="Real-Time Alerts" desc="Get notified instantly for any suspicious activity." />
            <Feature icon={<Users />} title="Role-Based Access" desc="Granular access control to manage who sees what." />
            <Feature icon={<CheckCircle />} title="Audit Logs" desc="Track every login and activity with detailed audit trails." />
            <Feature icon={<Globe />} title="Global Availability" desc="Access your vault from anywhere with ultra-fast response." />
            <Feature icon={<Shield />} title="Multi-Factor Auth" desc="Add layers of protection beyond passwords." />
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="security" className="relative z-10 py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose SecureVault?</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          We combine the latest in cybersecurity technology with a clean, intuitive interface to keep your data safe, accessible, and under your control.
        </p>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative z-10 py-20 bg-gradient-to-r from-cyan-600 to-blue-700 text-center px-4">
        <h2 className="text-4xl font-bold mb-6 text-white">Start Protecting Your Data Today</h2>
        <p className="text-white/80 mb-8">Join thousands who trust SecureVault with their digital security.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-white text-cyan-700 font-semibold rounded-lg hover:scale-105 transition-all"
          >
            <UserPlus className="inline mr-2 -mt-1" />
            Create Account
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-white/10 border border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
          >
            <Lock className="inline mr-2 -mt-1" />
            Login
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 border-t border-white/10 py-6 text-center text-white/60 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} SecureVault. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#security" className="hover:text-white">Why Us</a>
            <a href="/register" className="hover:text-white">Sign Up</a>
            <a href="/login" className="hover:text-white">Login</a>
          </div>
        </div>
      </footer>

      {/* Floating animation */}
     <style>
  {`
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
      50% { transform: translateY(-20px) translateX(10px) rotate(180deg); opacity: 1; }
    }
  `}
</style>

    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="flex items-start space-x-4">
    <div className="p-3 bg-cyan-500/20 rounded-full text-cyan-400">{icon}</div>
    <div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-white/60 text-sm">{desc}</p>
    </div>
  </div>
);

export default Landing;
