import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
export default function Sidebar({ isOpen, onClose, className }) {

  const onLogout=()=>{
    
    console.log("Logging out");
    localStorage.clear();
    navigate("/login");
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white z-40"
            
          />

          {/* Sidebar */}
       <motion.div
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ x: "100%" }}
  transition={{ type: "tween", duration: 0.5 }}
  className={`fixed top-12 right-0 h-full w-full sm:w-72 md:w-85 lg:w-96 shadow-xl z-50 flex flex-col bg-white text-black ${className}`}
>

            {/* Close Button */}
           

            {/* Menu Items */}
           <nav className="flex flex-col px-4 text-base font-sans space-y-3 mt-6">
  <Link 
    href="/" 
    className="text-gray-800 text-lg font-medium tracking-wide 
    hover:text-yellow-500 transition duration-200"
  >
    Dashboard
  </Link>
  <a 
    href="/kanban" 
    className="text-gray-800 text-lg font-medium tracking-wide hover:text-yellow-500 transition duration-200"
  >
    Kanban
  </a>
  <a 
    href="/inbox" 
    className="text-gray-800 text-lg font-medium tracking-wide hover:text-yellow-500 transition duration-200"
  >
    Inbox
  </a>
  <a 
    href="/products" 
    className="text-gray-800 text-lg font-medium tracking-wide hover:text-yellow-500 transition duration-200"
  >
    Products
  </a>
  <Link 
    href="/" 
    className="text-gray-800 text-lg font-medium tracking-wide hover:text-yellow-500 transition duration-200"
        onClick={onLogout}
  >
    Sign Out
  </Link>
</nav>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
