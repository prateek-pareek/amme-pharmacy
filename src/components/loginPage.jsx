import React, { useState } from 'react';
import { TextField, Button, Checkbox } from "@mui/material";
import icon from "../assets/Frame 401.png";
import image from "../assets/Frame 436.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stayConnected, setStayConnected] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://amme-api-pied.vercel.app/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      console.log("Login successful:", response.data);
      navigate("../Page5");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-between gap-6 p-4 overflow-auto relative">
      {/* Left Section with Image */}
      <div className="md:w-[50%] w-full flex items-center">
        <img
          src={image}
          alt="Logo"
          className="md:w-4/5 min-h-[95vh] h-[95vh] rounded-lg"
        />
      </div>

      {/* Right side with form */}
      <div className="w-1/2 flex flex-col items-center justify-center px-16">
        {/* Logo */}
        <div className="mb-8">
          <img src={icon} alt="Logo" className="h-12" />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[400px]">
          <h1 className="text-2xl font-semibold mb-8">Connexion</h1>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-sm mb-2">
              Adresse email
            </label>
            <TextField
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#fff'
                }
              }}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm mb-2">
              Mot de passe
            </label>
            <TextField
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#fff'
                }
              }}
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Checkbox
                checked={stayConnected}
                onChange={(e) => setStayConnected(e.target.checked)}
                sx={{
                  padding: '0',
                  marginRight: '8px',
                  '&.Mui-checked': {
                    color: '#0066FF',
                  },
                }}
              />
              <span className="text-sm">Rester connecté</span>
            </div>
            <a href="#" className="text-sm text-[#0066FF] hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          {/* Login Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#0066FF',
              borderRadius: '8px',
              textTransform: 'none',
              padding: '12px',
              '&:hover': {
                backgroundColor: '#0052CC'
              }
            }}
          >
            Se connecter
          </Button>
        </div>
      </div>
    </div>
  );
}