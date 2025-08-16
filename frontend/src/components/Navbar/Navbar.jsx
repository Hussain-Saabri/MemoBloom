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
    toast.success("Logged Out!", {
      style: {
        background: "linear-gradient(135deg, #4ade80, #16a34a)",
        color: "#f0fdfa",
        fontWeight: "700",
        borderRadius: isMobile ? "14px" : "20px",
        padding: isMobile ? "8px 20px" : "10px 40px",
        boxShadow:
          "0 6px 18px rgba(22, 163, 74, 0.5), 0 0 10px rgba(5, 150, 105, 0.3)",
        fontSize: isMobile ? "15px" : "19px",
        letterSpacing: isMobile ? "0.5px" : "0.8px",
        textTransform: "capitalize",
        fontFamily: "'Poppins', sans-serif",
        backdropFilter: "blur(8px)",
        border: "1.5px solid rgba(22, 163, 74, 0.5)",
      },
      iconTheme: {
        primary: "#a7f3d0",
        secondary: "#065f46",
      },
      duration: 4500,
    });

    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="sticky top-0 z-50  backdrop-blur-lg border-b border-sky-100 shadow-sm">
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
