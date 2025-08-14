// Sidebar.jsx
import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 flex flex-col"
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <X size={28} className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col px-6 space-y-4 mt-4">
          <a href="/" className="text-gray-800 font-semibold hover:text-green-500">Dashboard</a>
          <a href="/kanban" className="text-gray-800 font-semibold hover:text-green-500">Kanban</a>
          <a href="/inbox" className="text-gray-800 font-semibold hover:text-green-500">Inbox</a>
          <a href="/products" className="text-gray-800 font-semibold hover:text-green-500">Products</a>
          <a href="/login" className="text-gray-800 font-semibold hover:text-green-500">Sign In</a>
        </nav>
      </motion.div>
    </>
  );
}
