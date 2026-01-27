import SideNavbar from './SideNavbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-primary/15 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      <SideNavbar />

      {/* Main Content Area */}
      <div className="flex flex-col md:ml-[72px] transition-all duration-300">
        <main className="flex-1 min-h-screen">
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
