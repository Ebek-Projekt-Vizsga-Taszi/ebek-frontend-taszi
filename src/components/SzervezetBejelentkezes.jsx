import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SzervezetBejelentkezes = ({ setIsOrganizationAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Animációs változók
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" },
    tap: { scale: 0.95 }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/ok/login/szervezet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, jelszo: password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('orgToken', data.token);
        setIsOrganizationAuthenticated(true);
        navigate('/SzervezetDashboard');
      } else {
        setError(data.message || 'Hibás email vagy jelszó');
      }
    } catch (error) {
      setError('Hiba történt a bejelentkezés során');
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-[url('/BackgroundPic.png')] bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl"
        variants={formVariants}
      >
        <div>
          <div className="flex justify-center mb-6">
            <motion.img
              src="/LogoBlack.png"
              alt="Logo"
              className="h-12 w-auto"
              whileHover={{ rotate: 10 }}
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Szervezeti bejelentkezés
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email cím
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email cím"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Jelszó
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Jelszó"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <motion.div 
              className="text-red-500 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <div>
            <motion.button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Bejelentkezés
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SzervezetBejelentkezes; 