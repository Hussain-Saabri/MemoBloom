import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from '../SearchBar/SearchBar';
import Sidebar from "../Sidebar/Sidebar";
import { Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = ({ setSearchQuery }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = window.innerWidth < 480;

  const onLogout = () => {
    
  navigate("/login");
  localStorage.clear();
   
  };

  return (
    <>
     <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-sky-100 shadow-sm">

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Logo */}
          <h1
            className="text-[30px] sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-sky-500 via-emerald-400 to-lime-400 bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate("/dashboard")}
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
            {menuOpen ? <X size={30} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        className="bg-white"
      />
    </>
  );
};

export default Navbar;
