import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import icon from "../assets/Frame 401.png"; // Adjust path if needed
import image from "../assets/Frame 436.png";
import { Link } from "react-router-dom";

const Page2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateConditions = () => {
    return {
      length: password.length >= 10,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
      match: password === confirmPassword,
    };
  };

  const conditions = validateConditions();

  const renderCondition = (isValid, text) => (
    <div className="flex items-center gap-2">
      {isValid ? (
        <CheckCircleOutlineIcon style={{ color: "green" }} />
      ) : (
        <CancelOutlinedIcon style={{ color: "red" }} />
      )}
      <span style={{ color: isValid ? "green" : "red" }}>{text}</span>
    </div>
  );

  const handleSubmit = () => {
    if (Object.values(conditions).every((condition) => condition)) {
      console.log({ email, password });
    //   alert("Form submitted successfully!");
    } else {
      alert("Veuillez respecter toutes les conditions du mot de passe.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center gap-6 p-4">
      {/* Left Section with Image */}
      <div className="md:w-2/5 w-full flex items-center justify-center">
        <img src={image} alt="Logo" className="w-full h-auto rounded-lg" />
      </div>

      {/* Right Section with Form */}
      <div className="bg-white py-8 px-6 md:px-12 rounded-lg md:w-2/5 w-full">
        {/* Top Icon */}
        <img src={icon} alt="Icon" className="mx-auto mb-4 h-12" />

        {/* Form Title */}
        <h1 className="text-2xl font-semibold text-center mb-6">
          Informations du compte
        </h1>

        {/* Email Input */}
        <div className="my-2">
          <p className="my-2">Adresse e-mail de la pharmacie*</p>
          <TextField
            label="Adresse e-mail"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="my-2">
          <p className="my-2">Mot de passe*</p>
          <TextField
            label="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Password Confirmation Input */}
        <div className="my-2">
          <p className="my-2">Confirmer le mot de passe*</p>
          <TextField
            label="Confirmer le mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Password Requirements */}
        <div className="mt-4">
          {renderCondition(conditions.length, "Au moins 10 caractères")}
          {renderCondition(
            conditions.uppercase,
            "Inclut au moins une lettre majuscule"
          )}
          {renderCondition(
            conditions.lowercase,
            "Inclut au moins une lettre minuscule"
          )}
          {renderCondition(conditions.number, "Inclut au moins un chiffre")}
          {renderCondition(conditions.symbol, "Inclut au moins un symbole")}
          {renderCondition(conditions.match, "Les mots de passe correspondent")}
        </div>

        {/* Submit Button */}
        <Link to="/page3">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
          onClick={handleSubmit}
        >
          Continuer
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page2;
