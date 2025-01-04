import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import icon from "../assets/Frame 401.png"; // Adjust path if needed
import image from "../assets/Frame 436.png";
import { Link } from "react-router-dom";
import LoginPagesInspector from "./UI/LoginPagesInspecter";

const Page2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(2); // Add state for current page

  // States for password requirements
  const [minLength, setMinLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasUpperAndLower, setHasUpperAndLower] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  useEffect(() => {
    // Check password requirements
    setMinLength(password.length >= 10);
    setHasNumber(/[0-9]/.test(password));
    setHasUpperAndLower(/[a-z]/.test(password) && /[A-Z]/.test(password));
    setHasSymbol(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  }, [password]);

  return (
    <div className="flex flex-col md:flex-row h-[100vh] items-center justify-between gap-6 p-4 overflow-auto relative">
      {/* Left Section with Image */}
      <div className="md:w-[50%] w-full flex items-center">
        <img
          src={image}
          alt="Logo"
          className="md:w-4/5 min-h-[800px] h-[800px] rounded-lg"
        />
      </div>

      {/* Right Section with Form */}
      <div className="md:pr-12 md:w-[50%] flex items-center justify-center">
        <div className="bg-white py-8 rounded-lg w-full md:w-[90%] px-6">
          {/* Top Icon */}
          <div className="main pl-[180px]">
            <img src={icon} alt="Icon" className="mb-4 h-12" />
          </div>

          {/* Form Title */}
          <h1 className="text-2xl font-semibold text-left mb-6">
            Informations de compte
          </h1>

          {/* Email Input */}
          <div className="mb-4">
            <p className="mb-2">Adresse e-mail de la pharmacie*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* Password Input */}
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
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* Password Confirmation Input */}
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
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* Password Requirements */}
          <div className="mt-4">
            <p style={{ color: minLength ? "green" : "gray", marginBottom: "10px" }} className="flex items-center">
              {minLength ? <CheckCircleOutlineIcon style={{ color: "green" }} /> : <CancelOutlinedIcon style={{ color: "gray" }} />}
              Au moins 10 caractères
            </p>
            <p style={{ color: hasNumber ? "green" : "gray", marginBottom: "10px" }} className="flex items-center">
              {hasNumber ? <CheckCircleOutlineIcon style={{ color: "green" }} /> : <CancelOutlinedIcon style={{ color: "gray" }} />}
              Inclut des chiffres
            </p>
            <p style={{ color: hasUpperAndLower ? "green" : "gray", marginBottom: "10px" }} className="flex items-center">
              {hasUpperAndLower ? <CheckCircleOutlineIcon style={{ color: "green" }} /> : <CancelOutlinedIcon style={{ color: "gray" }} />}
              Inclut des lettres minuscules et majuscules
            </p>
            <p style={{ color: hasSymbol ? "green" : "gray", marginBottom: "10px" }} className="flex items-center">
              {hasSymbol ? <CheckCircleOutlineIcon style={{ color: "green" }} /> : <CancelOutlinedIcon style={{ color: "gray" }} />}
              Inclut un symbole
            </p>
          </div>

          {/* Submit Button */}
          <Link to="/page3">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
              sx={{ maxWidth: '400px' }}
            >
              Continuer
            </Button>
          </Link>
        </div>
      </div>

      {/* Inspector */}
      <LoginPagesInspector currentPage={currentPage} totalPages={3} />
    </div>
  );
};

export default Page2;
