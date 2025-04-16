import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import icon from "../assets/Frame 401.png";
import image from "../assets/Frame 436.png";
import { useNavigate } from "react-router-dom";
import LoginPagesInspector from "./UI/LoginPagesInspecter";
import axios from "axios";

const Page2 = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPage] = useState(2);
  const [error, setError] = useState(null);

  const [minLength, setMinLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasUpperAndLower, setHasUpperAndLower] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  // Check for sessionId on component mount
  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      setError("Session ID missing. Please complete step 1 first.");
      console.error("No sessionId found in localStorage");
      // Uncomment to auto-redirect
      // setTimeout(() => navigate("/page1"), 2000);
    } else {
      console.log("SessionId found in localStorage:", sessionId);
    }
  }, [navigate]);

  useEffect(() => {
    setMinLength(password.length >= 10);
    setHasNumber(/[0-9]/.test(password));
    setHasUpperAndLower(/[a-z]/.test(password) && /[A-Z]/.test(password));
    setHasSymbol(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  }, [password]);

  const handleSubmit = async () => {
    try {
      setError(null);
      const sessionId = localStorage.getItem("sessionId");
      
      if (!sessionId) {
        setError("Session ID missing. Please complete step 1 first.");
        console.error("No sessionId found in localStorage");
        return;
      }

      const payload = {
        sessionId,
        email,
        password,
        passwordConfirm: confirmPassword,
      };

      console.log('Sending payload:', payload);

      const response = await axios.post(
        "https://amme-api-pied.vercel.app/api/pharmacist/step2",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Step 2 Success:", response.data);
      navigate("/page3");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occurred during registration";
      setError(errorMessage);
      console.error("Step 2 Error:", error?.response?.data || error.message);
    }
  };

  // Add a "Go to Step 1" button if no sessionId
  const goToStep1 = () => {
    navigate("/page1");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-between gap-6 p-4 overflow-auto relative">
      {/* Left Image */}
      <div className="md:w-[50%] w-full flex items-center">
        <img
          src={image}
          alt="Logo"
          className="md:w-4/5 min-h-[95vh] h-[95vh] rounded-lg"
        />
      </div>

      {/* Right Form */}
      <div className="md:pr-12 md:w-[50%] flex items-center justify-center h-full overflow-auto">
        <div className="bg-white py-8 rounded-lg w-full md:w-[90%] px-6 h-full flex flex-col justify-between overflow-y-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={icon} alt="Icon" className="h-12" />
          </div>

          <h1 className="text-2xl font-semibold text-left mb-6">
            Informations de compte
          </h1>

          {/* Display error if any */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
              {!localStorage.getItem("sessionId") && (
                <Button 
                  variant="outlined" 
                  color="error" 
                  size="small" 
                  onClick={goToStep1}
                  className="mt-2"
                >
                  Go to Step 1
                </Button>
              )}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <p className="mb-2">Adresse e-mail de la pharmacie*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              sx={{ maxWidth: "400px" }}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <p className="mb-2">Mot de passe*</p>
            <TextField
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              sx={{ maxWidth: "400px" }}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <p className="mb-2">Confirmer le mot de passe*</p>
            <TextField
              type="password"
              variant="outlined"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              size="small"
              sx={{ maxWidth: "400px" }}
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                Les mots de passe ne correspondent pas
              </p>
            )}
          </div>

          {/* Password Conditions */}
          <div className="mt-4">
            <p className={`flex items-center mb-2 ${minLength ? "text-green-600" : "text-gray-500"}`}>
              {minLength ? <CheckCircleOutlineIcon className="mr-2 text-green-600" /> : <CancelOutlinedIcon className="mr-2 text-gray-500" />}
              Au moins 10 caractères
            </p>
            <p className={`flex items-center mb-2 ${hasNumber ? "text-green-600" : "text-gray-500"}`}>
              {hasNumber ? <CheckCircleOutlineIcon className="mr-2 text-green-600" /> : <CancelOutlinedIcon className="mr-2 text-gray-500" />}
              Inclut des chiffres
            </p>
            <p className={`flex items-center mb-2 ${hasUpperAndLower ? "text-green-600" : "text-gray-500"}`}>
              {hasUpperAndLower ? <CheckCircleOutlineIcon className="mr-2 text-green-600" /> : <CancelOutlinedIcon className="mr-2 text-gray-500" />}
              Inclut des lettres minuscules et majuscules
            </p>
            <p className={`flex items-center mb-2 ${hasSymbol ? "text-green-600" : "text-gray-500"}`}>
              {hasSymbol ? <CheckCircleOutlineIcon className="mr-2 text-green-600" /> : <CancelOutlinedIcon className="mr-2 text-gray-500" />}
              Inclut un symbole
            </p>
          </div>

          {/* Submit */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
            sx={{ maxWidth: "400px" }}
            disabled={
              !email ||
              !password ||
              !confirmPassword ||
              password !== confirmPassword ||
              !minLength ||
              !hasNumber ||
              !hasUpperAndLower ||
              !hasSymbol
            }
            onClick={handleSubmit}
          >
            Continuer
          </Button>
        </div>
      </div>

      {/* Step Indicator */}
      <LoginPagesInspector currentPage={currentPage} totalPages={3} />
    </div>
  );
};

export default Page2;