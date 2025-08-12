import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from '../SearchBar/SearchBar';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ setSearchQuery }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1
          className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-sky-500 via-emerald-400 to-lime-400 bg-clip-text text-transparent cursor-pointer"
          onClick={() => navigate("/")}
        >
          Memo<span className="font-black">Bloom</span>
        </h1>

        {/* Desktop Search */}
        <div className="hidden md:block w-96">
          <SearchBar setSearchQuery={setSearchQuery} />
        </div>

        {/* Desktop Profile */}
        <div className="hidden md:block">
          <ProfileInfo onLogout={onLogout} />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden px-4 pb-4 bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="mt-3 space-y-4">
              <SearchBar setSearchQuery={setSearchQuery} />
              <ProfileInfo onLogout={onLogout} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
