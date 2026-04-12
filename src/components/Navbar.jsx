import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-brand-dark sticky top-0 z-50 w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="text-white text-xl font-bold tracking-tight">Med</span>
            <span className="text-brand-mint text-xl font-bold tracking-tight">IA</span>
            <Activity className="h-5 w-5 text-brand-mint ml-2" />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-brand-mint transition-colors px-2 py-2 text-xs font-semibold uppercase tracking-wide">Accueil</Link>
            <Link to="/services" className="text-gray-300 hover:text-brand-mint transition-colors px-2 py-2 text-xs font-semibold uppercase tracking-wide">Services</Link>
            <Link to="/solutions" className="text-gray-300 hover:text-brand-mint transition-colors px-2 py-2 text-xs font-semibold uppercase tracking-wide">Solutions</Link>
            <Link to="/ressources" className="text-gray-300 hover:text-brand-mint transition-colors px-2 py-2 text-xs font-semibold uppercase tracking-wide">Ressources</Link>
            <Link to="/contact" className="text-gray-300 hover:text-brand-mint transition-colors px-2 py-2 text-xs font-semibold uppercase tracking-wide">Contact</Link>
          </div>

          <div className="md:flex flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-brand-mint focus:outline-none">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-brand-dark shadow-xl border-t border-gray-800 absolute w-full left-0 z-50">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col text-sm">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-300 block px-3 py-3 border-b border-gray-800">Accueil</Link>
            <Link to="/services" onClick={() => setIsOpen(false)} className="text-gray-300 block px-3 py-3 border-b border-gray-800">Services</Link>
            <Link to="/solutions" onClick={() => setIsOpen(false)} className="text-gray-300 block px-3 py-3 border-b border-gray-800">Solutions</Link>
            <Link to="/ressources" onClick={() => setIsOpen(false)} className="text-gray-300 block px-3 py-3 border-b border-gray-800">Ressources</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-gray-300 block px-3 py-3 border-b border-gray-800">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
