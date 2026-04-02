import { useState } from 'react';
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle, ScanFace, QrCode } from 'lucide-react';
import { DotLottiePlayer } from '@dotlottie/react-player';

interface LoginProps {
  onLoginSuccess: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fake auth handler for QR / Face ID to show success animation
  const handleAlternativeLogin = () => {
    setError(false);
    setIsSuccess(true);
    setTimeout(() => {
      onLoginSuccess();
    }, 800);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);

    // Hardcoded credentials as requested
    if (email === 'anupjena925@gmail.com' && password === 'anupjena925@gmail') {
      setIsSuccess(true);
      // Wait for success animation to finish
      setTimeout(() => {
        onLoginSuccess();
      }, 800);
    } else {
      setError(true);
      // Remove shake class after animation finishes so it can shake again
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden font-sans p-4">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/30 rounded-full blur-[120px] mix-blend-screen animate-float"></div>
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-cyan-600/20 rounded-full blur-[100px] mix-blend-screen animate-float-delayed"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-emerald-600/20 rounded-full blur-[120px] mix-blend-screen animate-float-slow"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[25%] h-[25%] bg-blue-600/30 rounded-full blur-[80px] mix-blend-screen animate-float"></div>

      {/* Grid Overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Login Container */}
      <div 
        className={`relative z-10 w-full max-w-4xl flex flex-col md:flex-row rounded-[2.5rem] backdrop-blur-2xl bg-slate-900/40 border border-slate-700/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] transition-all duration-500 overflow-hidden
          ${error ? 'animate-shake border-rose-500/50 shadow-rose-500/20' : ''}
          ${isSuccess ? 'scale-110 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}
        `}
      >
        {/* Left Column: Visuals & Alternative Login */}
        <div className="w-full md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-700/50 flex flex-col justify-between bg-gradient-to-br from-violet-500/5 to-cyan-500/5 relative overflow-hidden group">
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-2">Secure Access</h2>
            <p className="text-slate-400 text-sm">Experience the future of authentication</p>
          </div>

          <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-8">
            <div className="w-48 h-48 md:w-64 md:h-64 relative drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <DotLottiePlayer
                src="https://lottie.host/28b12af6-f6a6-4541-b897-82faeaab44c7/uF3IdoLGsK.lottie"
                autoplay
                loop
              />
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-4 bg-slate-950/40 p-4 rounded-2xl border border-slate-700/50 hover:border-violet-500/30 transition-all cursor-pointer group/qr" onClick={handleAlternativeLogin}>
            <div className="p-3 bg-white rounded-xl shadow-lg relative overflow-hidden">
             
              <QrCode className="text-slate-900" size={32} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/20 to-transparent animate-scanline"></div>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Scan QR Code</p>
              <p className="text-slate-400 text-xs mt-0.5">Use mobile app to login instantly</p>
            </div>
            <ArrowRight className="ml-auto text-slate-500 group-hover/qr:text-violet-400 group-hover/qr:translate-x-1 transition-all" size={18} />
          </div>
          
          {/* Subtle accent light in the corner */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-violet-600/20 rounded-full blur-[60px] group-hover:bg-violet-500/30 transition-colors duration-700"></div>
        </div>

        {/* Right Column: Traditional Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
          
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-violet-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30 mb-6 relative overflow-hidden group">
              <Sparkles className="text-white relative z-10 duration-500 group-hover:rotate-12 group-hover:scale-110" size={32} />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Welcome Back
            </h1>
            <p className="text-slate-400 mt-2 text-sm">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-violet-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all font-medium"
                  placeholder="anupjena925@gmail.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-violet-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all font-medium"
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-rose-400 text-sm mt-2 animate-fadeIn bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                <AlertCircle size={16} />
                <span>Invalid credentials. Please try again.</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full group relative flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl text-white font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-violet-500 transition-all duration-300 shadow-lg shadow-violet-500/25"
              >
                <span>Sign In</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 duration-300 text-white/80" />
                <div className="absolute inset-0 rounded-xl rounded-tr-none bg-white/20 blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-700"></div>
              <span className="flex-shrink-0 mx-4 text-slate-500 text-xs uppercase font-medium">Or continue with</span>
              <div className="flex-grow border-t border-slate-700"></div>
            </div>

            <button
              type="button"
              onClick={handleAlternativeLogin}
              className="w-full group relative flex justify-center items-center gap-3 py-3.5 px-4 border border-slate-600 bg-slate-800/50 hover:bg-slate-700 hover:border-emerald-500/50 rounded-xl text-white font-medium transition-all duration-300 overflow-hidden"
            >
              <div className="relative w-6 h-6 flex items-center justify-center text-emerald-400">
                <ScanFace size={22} className="relative z-10" />
                <div className="absolute inset-0 bg-emerald-400/20 shadow-[0_0_15px_rgba(52,211,153,0.5)] h-0.5 w-full animate-scanline z-20"></div>
              </div>
              <span>Face Recognition</span>
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}
