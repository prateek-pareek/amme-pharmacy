import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import icon from "../assets/Frame 401.png"; // Adjust path if needed
import image from "../assets/Frame 436.png";
import { Link } from "react-router-dom";

const Page2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  return (
    <div className="flex flex-col md:flex-row h-[100vh] items-center justify-between gap-6 p-4 overflow-hidden">
      {/* Left Section with Image */}
       <div className="md:w-[50%] w-full flex items-center ">
              <img
                src={image}
                alt="Logo"
                className="w-[85%] h-auto rounded-lg"
              />
            </div>

      {/* Right Section with Form */}
      <div className="md:pr-12 md:w-[50%] flex items-center justify-center">
      <div className="bg-white py-8 rounded-lg w-full md:w-[90%]  px-6 mr-[50px]">
        {/* Top Icon */}
        <div className="main pl-[180px]">

        <img src={icon} alt="Icon" className=" mb-4 h-12" />
        </div>

        {/* Form Title */}
        <h1 className="text-2xl font-semibold text-left mb-6">
          Informations de compte
        </h1>

         {/* Email Input */}
         <div className="mb-4">
          <p className="mb-2">Adresse e-mail de la pharmacie*</p>
          <TextField
            // label="Adresse e-mail"
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
            // label="Mot de passe"
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
            // label="Confirmer le mot de passe"
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
         <p style={{ color: "green", marginBottom: "10px" }}>
           <CheckCircleOutlineIcon style={{ color: "green" }} />Au moins 10 caractères
         </p>
         <p style={{ color: "green", marginBottom: "10px" }}>
           <CheckCircleOutlineIcon style={{ color: "green" }} />Inclut des chiffres
         </p>
         <p style={{ color: "green", marginBottom: "10px" }}>
          <CheckCircleOutlineIcon style={{ color: "green" }} />Inclut des lettres minuscules et majuscules
         </p>
         <p style={{ color: "green", marginBottom: "10px" }}>
           <CheckCircleOutlineIcon style={{ color: "green" }} />Inclut un symbole
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
    </div>
  );
};

export default Page2;