import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userDocumentId } = useAuth();

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-teal-500 p-6">
        <span className="font-semibold text-xl tracking-tight text-white">Codele</span>
        <FaBars
          className="text-white cursor-pointer"
          size={24}
          onClick={() => setIsMenuOpen(true)}
        />
      </nav>

      <motion.aside
        className="fixed inset-y-0 right-0 z-50 w-64 overflow-y-auto bg-teal-500 shadow-lg" // Updated background color
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={variants}
        transition={{ damping: 10, type: "spring" }}
      >

        <div className="p-5">
          <Link to="/home" className="block mobile-nav-link text-white" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/game/daily" className="block mobile-nav-link text-white" onClick={() => setIsMenuOpen(false)}>Daily Challenge</Link>
          <Link to="/leaderboard" className="block mobile-nav-link text-white" onClick={() => setIsMenuOpen(false)}>Leaderboard</Link>
          <Link to="/history" className="block mobile-nav-link text-white" onClick={() => setIsMenuOpen(false)}>History</Link>
          <Link to={`/profile/${userDocumentId}`} className="block mobile-nav-link text-white" onClick={() => setIsMenuOpen(false)}>Profile</Link>
          <Link to="/about" className="block mobile-nav-link text-white" onClick={() => setIsMenuOpen(false)}>About</Link>
          <button
            className="mt-4 p-2 w-full bg-white text-teal-500 rounded hover:bg-teal-200 text-teal-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Close Menu
          </button>
          {/*       <Link to="/game/weekly" className="block mobile-nav-link text-white" onClick={() => setIsMenuOpen(false)}>Weekly Challenge</Link>
          <Link to="/game/monthly" className="block mobile-nav-link text-white" onClick={() => setIsMenuOpen(false)}>Monthly Challenge</Link>*/}
        </div>
      </motion.aside>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </>
  );
};

export default Navbar;
