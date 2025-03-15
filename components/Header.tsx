
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="py-4 px-6 flex items-center justify-between border-b border-health-gray/30">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold tracking-tight flex items-center space-x-2">
          <span className="text-health-purple">Care</span>
          <span className="text-health-orange">+</span>
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center space-x-2">
        <NavLink to="/" active={isActive('/')}>Overview</NavLink>
        <NavLink to="/upload" active={isActive('/upload')}>Upload</NavLink>
        <NavLink to="/analysis" active={isActive('/analysis')}>Analysis</NavLink>
      </nav>
      
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-health-purple/20 flex items-center justify-center">
          <span className="text-sm text-health-purple-light font-medium">JD</span>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link 
      to={to} 
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
        active 
          ? 'bg-health-orange text-white' 
          : 'bg-health-dark-gray text-white/70 hover:bg-health-gray hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;