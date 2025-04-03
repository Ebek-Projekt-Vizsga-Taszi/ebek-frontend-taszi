import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../components/Background";

const Regisztracio = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    zipCode: "",
    city: "",
    street: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.03,
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    },
    tap: { 
      scale: 0.98,
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchCityByZipCode = async (zip) => {
    try {
      const response = await fetch(`https://hur.webmania.cc/zips/${zip}.json`);
      const data = await response.json();
      if (data.zips && data.zips.length > 0) {
        setFormData(prev => ({ ...prev, city: data.zips[0].name }));
      } else {
        setFormData(prev => ({ ...prev, city: "" }));
      }
    } catch (error) {
      console.error("Error fetching city:", error);
    }
  };

  const handleZipCodeChange = (e) => {
    const zip = e.target.value.replace(/\D/g, "").slice(0, 4);
    setFormData(prev => ({ ...prev, zipCode: zip }));
    
    if (zip.length === 4) {
      fetchCityByZipCode(zip);
    } else {
      setFormData(prev => ({ ...prev, city: "" }));
    }
  };

  const formatPhoneNumber = (input) => {
    const numbers = input.replace(/\D/g, "");
    let formatted = "";
    if (numbers.length > 0) formatted += numbers.substring(0, 2);
    if (numbers.length > 2) formatted += "/" + numbers.substring(2, 5);
    if (numbers.length > 5) formatted += "-" + numbers.substring(5, 9);
    return formatted;
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formattedPhone }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "A jelszavak nem egyeznek!";
    }
    
    if (formData.password.length < 6) {
      newErrors.password = "Legalább 6 karakter hosszú legyen!";
    }
    
    if (!/^\d{4}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Érvényes irányítószámot adjon meg!";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const address = `${formData.zipCode}, ${formData.city}, ${formData.street}`;
      
      const response = await fetch("http://localhost:8000/felhasznalok/regisztracio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tulajdonosEmail: formData.email,
          tulajdonosNeve: formData.username,
          tulajdonosCim: address,
          tulajdonosTel: formData.phone,
          jelszo: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/Bejelentkezés", { state: { registrationSuccess: true } });
      } else {
        setErrors({ apiError: data.message });
      }
    } catch (error) {
      setErrors({ apiError: "Hálózati hiba történt" });
    } finally {
      setIsLoading(false);
    }
  };

  // Eye icon component
  const EyeIcon = ({ show }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      {show ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      )}
    </svg>
  );

  return (
    <motion.div 
      className="relative min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Background />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8 relative"
          variants={itemVariants}
        >
          {/* Back button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-4 top-4"
          >
            <Link to="/" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Vissza
            </Link>
          </motion.div>

          {/* Logo */}
          <motion.div 
            className="flex justify-center mb-4"
            variants={itemVariants}
          >
            <img src="LogoBlack.png" alt="logo" className="h-12" />
          </motion.div>

          {/* Title */}
          <motion.h2 
            className="text-2xl font-bold text-center mb-1 text-gray-800 dark:text-white"
            variants={itemVariants}
          >
            Regisztráció
          </motion.h2>
          <motion.p 
            className="text-center text-gray-600 dark:text-gray-400 mb-6"
            variants={itemVariants}
          >
            a kezdéshez
          </motion.p>

          {/* Error messages */}
          {errors.apiError && (
            <motion.div 
              className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.apiError}
            </motion.div>
          )}

          <form onSubmit={handleRegister}>
            {/* Form fields */}
            {[
              { name: "username", label: "Felhasználónév", type: "text", placeholder: "Felhasználónév", required: true },
              { name: "email", label: "E-mail", type: "email", placeholder: "E-mail", required: true },
              { 
                name: "zipCode", 
                label: "Irányítószám", 
                type: "text", 
                placeholder: "Irányítószám", 
                required: true,
                onChange: handleZipCodeChange,
                maxLength: 4,
                error: errors.zipCode
              },
              { name: "city", label: "Település", type: "text", placeholder: "Település", required: true, readOnly: true },
              { name: "street", label: "Utca, házszám", type: "text", placeholder: "Utca, házszám", required: true },
              { 
                name: "phone", 
                label: "Telefonszám", 
                type: "text", 
                placeholder: "Telefonszám", 
                required: true,
                onChange: handlePhoneChange,
                maxLength: 12
              },
              { 
                name: "password", 
                label: "Jelszó", 
                type: showPassword ? "text" : "password", 
                placeholder: "Jelszó", 
                required: true,
                error: errors.password
              },
              { 
                name: "confirmPassword", 
                label: "Jelszó megerősítése", 
                type: showPassword ? "text" : "password", 
                placeholder: "Jelszó megerősítése", 
                required: true,
                error: errors.confirmPassword
              }
            ].map((field, index) => (
              <motion.div 
                key={field.name} 
                className="mb-4"
                variants={itemVariants}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    className={`w-full p-3 text-sm border ${
                      field.error 
                        ? 'border-red-500 dark:border-red-400' 
                        : 'border-gray-300 dark:border-gray-600'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={field.onChange || handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    readOnly={field.readOnly}
                    maxLength={field.maxLength}
                  />
                  {(field.name === 'password' || field.name === 'confirmPassword') && (
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                      onClick={togglePasswordVisibility}
                    >
                      <EyeIcon show={showPassword} />
                    </button>
                  )}
                </div>
                {field.error && (
                  <motion.p 
                    className="text-red-500 dark:text-red-400 text-xs mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {field.error}
                  </motion.p>
                )}
              </motion.div>
            ))}

            {/* Terms checkbox */}
            <motion.div 
              className="flex items-center mb-6"
              variants={itemVariants}
            >
              <input 
                type="checkbox" 
                id="terms" 
                className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700" 
                required 
              />
              <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300 select-none">
                Elfogadom a <Link to="/Iranyelvek" className="text-blue-600 dark:text-blue-400 hover:underline">feltételeinket</Link>
              </label>
            </motion.div>

            {/* Submit button */}
            <motion.button
              type="submit"
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-70"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Feldolgozás...
                </span>
              ) : (
                "Regisztráció"
              )}
            </motion.button>
          </form>

          {/* Login link */}
          <motion.p 
            className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400"
            variants={itemVariants}
          >
            Már regisztráltál?{" "}
            <Link to="/Bejelentkezés" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
              Bejelentkezés
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Regisztracio;