import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Sparkles,
  FolderOpen, 
  Mail, 
  Download,
  Github,
  Linkedin,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: User },
  { name: 'Skills', path: '/skills', icon: Sparkles },
  { name: 'Projects', path: '/projects', icon: FolderOpen },
  { name: 'Contact', path: '/contact', icon: Mail },
];

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isOpen]);

  const handleDownload = () => {
        const fileUrl = "/teslimagboola_resume.pdf";
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", "teslimagboola_resume.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  const NavItem = ({ link, isActive }) => (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to={link.path}
          className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
            isActive
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <link.icon className="w-5 h-5" />
          {isActive && (
            <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-full" />
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={12} className="font-medium">
        {link.name}
      </TooltipContent>
    </Tooltip>
  );

  const ActionButton = ({ icon: Icon, label, onClick, href }) => {
    const content = (
      <div className="flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
        <Icon className="w-5 h-5" />
      </div>
    );

    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          ) : (
            <button onClick={onClick}>{content}</button>
          )}
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={12} className="font-medium">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop Side Navbar - Always collapsed */}
      {!isMobile && (
        <aside className="fixed top-0 left-0 h-full w-[72px] z-50">
          <div className="h-full bg-card/95 backdrop-blur-xl border-r border-border flex flex-col overflow-hidden">
            {/* Logo */}
            <div className="p-3 border-b border-border flex justify-center">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to="/"
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <span className="text-xl font-bold text-white font-display">T</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={12}>
                  <div>
                    <p className="font-bold">Tescode</p>
                    <p className="text-xs text-muted-foreground">Portfolio 2026</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-4 px-3 flex flex-col items-center gap-2 overflow-hidden">
              {navLinks.map((link) => (
                <NavItem
                  key={link.path}
                  link={link}
                  isActive={location.pathname === link.path}
                />
              ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-3 border-t border-border flex flex-col items-center gap-2 overflow-hidden">
              {/* Theme Toggle */}
              <ActionButton
                icon={isDark ? Sun : Moon}
                label={isDark ? 'Light Mode' : 'Dark Mode'}
                onClick={toggleTheme}
              />

              {/* Social Links */}
              <div className="flex flex-col items-center gap-1">
                <ActionButton
                  icon={Github}
                  label="GitHub"
                  href="https://github.com/devtescode"
                />
                <ActionButton
                  icon={Linkedin}
                  label="LinkedIn"
                  href="https://www.linkedin.com/in/teslim-agboola-ab069b252/"
                />
              </div>

              {/* Resume Button */}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button onClick={handleDownload} className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 flex items-center justify-center text-primary-foreground shadow-md shadow-primary/20 transition-all duration-200">
                    <Download className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={12} className="font-medium">
                  Download Resume
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </aside>
      )}

      {/* Mobile Side Navbar - Slide out panel */}
      {isMobile && (
        <aside
          className={`fixed top-0 left-0 h-full w-[72px] z-50 transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full bg-card/95 backdrop-blur-xl border-r border-border flex flex-col overflow-hidden">
            {/* Logo */}
            <div className="p-3 border-b border-border flex justify-center">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <span className="text-xl font-bold text-white font-display">T</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={12}>
                  <div>
                    <p className="font-bold">Tescode</p>
                    <p className="text-xs text-muted-foreground">Portfolio 2026</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-4 px-3 flex flex-col items-center gap-2 overflow-hidden">
              {navLinks.map((link) => (
                <NavItem
                  key={link.path}
                  link={link}
                  isActive={location.pathname === link.path}
                />
              ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-3 border-t border-border flex flex-col items-center gap-2 overflow-hidden">
              <ActionButton
                icon={isDark ? Sun : Moon}
                label={isDark ? 'Light Mode' : 'Dark Mode'}
                onClick={toggleTheme}
              />

              <div className="flex flex-col items-center gap-1">
                <ActionButton
                  icon={Github}
                  label="GitHub"
                  href="https://github.com/devtescode"
                />
                <ActionButton
                  icon={Linkedin}
                  label="LinkedIn"
                  href="https://www.linkedin.com/in/teslim-agboola-ab069b252/"
                />
              </div>

              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button onClick={handleDownload} className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 flex items-center justify-center text-primary-foreground shadow-md shadow-primary/20 transition-all duration-200">
                    <Download className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={12} className="font-medium">
                  Download Resume
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </aside>
      )}

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
            isOpen ? 'rotate-90' : 'rotate-0'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      )}
    </>
  );
};

export default SideNavbar;
