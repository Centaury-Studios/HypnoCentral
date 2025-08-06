import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { handleNavigation } from '../../lib/scroll';
import type { NavigationItem } from '../../types/navigation';

const navigation: NavigationItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Studio', href: '#studio' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '/portfolio', isRoute: true },
  { label: 'Contact', href: '#portfolio-contact' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/portfolio?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm('');
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname === '/') {
      // If we're on the home page, use smooth scroll
      handleNavigation(e, href);
    } else {
      // If we're on another page, navigate to home first then scroll
      e.preventDefault();
      navigate('/' + href);
    }
  };

  return (
    <Disclosure as="nav" className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'glass-nav' : 'bg-transparent'
    }`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              {/* Logo */}
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-12 h-12 relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary/30 rounded-full animate-glow"></div>
                  </div>
                  <img 
                    src="/logo.png" 
                    alt="HypnoCentral Logo" 
                    className="w-full h-full object-contain filter drop-shadow-lg relative z-10"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-light text-white font-sans tracking-wider">
                    HypnoCentral
                  </h1>
                  <p className="text-xs text-gray-400 -mt-1 font-tech">Gaming Studio</p>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => item.isRoute ? (e.preventDefault(), navigate(item.href)) : handleNavClick(e, item.href)}
                    className="relative text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300 group cursor-pointer"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                  </motion.a>
                ))}
              </div>

              {/* Search & CTA */}
              <div className="hidden lg:flex items-center space-x-4">
                {/* Search Bar */}
                <motion.div
                  className={`search-bar transition-all duration-300 ${
                    searchOpen ? 'w-64' : 'w-12'
                  }`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className={`flex items-center ${searchOpen ? 'px-4 py-2' : 'justify-center py-2'}`}>
                    <button
                      onClick={() => setSearchOpen(!searchOpen)}
                      className={`flex items-center justify-center text-gray-400 hover:text-white transition-colors ${
                        searchOpen ? 'w-6 h-6' : 'w-8 h-8'
                      }`}
                    >
                      <MagnifyingGlassIcon className="w-5 h-5" />
                    </button>
                    {searchOpen && (
                      <motion.input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearch}
                        placeholder="Search projects..."
                        className="ml-3 flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        transition={{ duration: 0.3 }}
                        autoFocus
                        onBlur={() => setSearchOpen(false)}
                      />
                    )}
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary bg-transparent border border-primary/50 hover:border-primary/70 transition-all duration-200 relative overflow-hidden launcher-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="absolute inset-0 blur-[1px]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(125, 211, 252, 0.6) 1px, transparent 0)`,
                    backgroundSize: '4px 4px',
                    maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in'
                  }}></div>
                  <ArrowDownTrayIcon className="w-4 h-4 relative z-10 drop-shadow-sm" />
                  <span className="relative z-10 drop-shadow-sm">Launcher</span>
                </motion.button>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <Disclosure.Button className="btn-ghost p-2 rounded-lg">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Panel */}
          <Disclosure.Panel className="lg:hidden">
            <motion.div 
              className="glass-card mx-4 my-4 p-6 space-y-4"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mobile Search */}
              <div className="search-bar w-full">
                <div className="flex items-center px-4 py-3">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="Search projects..."
                    className="ml-3 flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.label}
                    as="a"
                    href={item.href}
                    onClick={(e) => item.isRoute ? (e.preventDefault(), navigate(item.href)) : handleNavClick(e, item.href)}
                    className="block text-gray-300 hover:text-white px-4 py-3 text-base font-medium transition-colors duration-200 rounded-lg hover:bg-white/5 cursor-pointer"
                  >
                    {item.label}
                  </Disclosure.Button>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-white/10">
                <button className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl font-semibold text-primary bg-transparent border border-primary/50 hover:border-primary/70 transition-all duration-200 relative overflow-hidden">
                  <div className="absolute inset-0 blur-[1px]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(125, 211, 252, 0.6) 1px, transparent 0)`,
                    backgroundSize: '4px 4px',
                    maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in'
                  }}></div>
                  <ArrowDownTrayIcon className="w-4 h-4 relative z-10 drop-shadow-sm" />
                  <span className="relative z-10 drop-shadow-sm">Launcher</span>
                </button>
              </div>
            </motion.div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;