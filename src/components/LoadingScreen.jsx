import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2800;
    const interval = 30;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[200] bg-background flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative w-full max-w-md px-8">
        {/* Logo & Brand */}
        <div className="text-center mb-16">
          <div className="relative w-24 h-24 mx-auto mb-8">
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 animate-spin" style={{ animationDuration: '3s' }} />
            {/* Logo */}
            <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30">
              <span className="text-4xl font-bold text-white font-display">T</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-3">
            <span className="gradient-text">Tescode</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold font-display text-foreground/80 mb-2">
            Professional Portfolio
          </h2>
          <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
            2026 Edition
          </p>
        </div>

        {/* Progress Section */}
        <div className="space-y-6">
          {/* Status Text */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="font-medium">Initializing</span>
            </span>
            <span className="font-mono text-primary font-bold text-lg">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden border border-border/50">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-accent rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Glow effect on bar end */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full blur-md" />
            </div>
            {/* Animated shine effect */}
            <div
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ 
                left: `${progress - 24}%`,
                animation: 'shimmer 1.5s ease-in-out infinite'
              }}
            />
          </div>

          {/* Loading Steps Indicators */}
          <div className="flex justify-center gap-2 pt-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  progress >= (i + 1) * 20
                    ? 'bg-primary scale-100 shadow-sm shadow-primary/50'
                    : 'bg-muted/50 scale-75'
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-muted-foreground/60 mt-16 tracking-wide">
          Crafting digital excellence...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
