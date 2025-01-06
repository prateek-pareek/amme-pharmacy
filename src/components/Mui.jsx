import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, MenuItem } from "@mui/material";
import ReactWorldFlags from "react-world-flags";
import icon from "../assets/Frame 401.png"; // Adjust path if needed
import image from "../assets/Frame 436.png";
import { Link } from "react-router-dom";
import LoginPagesInspector from "./UI/LoginPagesInspecter";
// import LoginPagesInspector from "./UI/LoginPagesInspector"; // Import the inspector component

const countryOptions = [
  { code: "US", dialCode: "+1", label: "États-Unis" },
  { code: "GB", dialCode: "+44", label: "Royaume-Uni" },
  { code: "IN", dialCode: "+91", label: "Inde" },
  { code: "FR", dialCode: "+33", label: "France" },
  { code: "DE", dialCode: "+49", label: "Allemagne" },
  { code: "JP", dialCode: "+81", label: "Japon" },
  { code: "AU", dialCode: "+61", label: "Australie" },
  { code: "CN", dialCode: "+86", label: "Chine" },
  { code: "IT", dialCode: "+39", label: "Italie" },
  { code: "ES", dialCode: "+34", label: "Espagne" },
];

const Mui = () => {
  const [selectedCountry, setSelectedCountry] = useState("FR");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Add state for current page

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
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

      {/* Right Section with Form */}
      <div className="md:pr-12 md:w-[50%] flex items-center justify-center h-full overflow-auto">
        <div className="bg-white py-0 rounded-lg w-full md:w-[90%] px-6 h-full flex flex-col justify-between overflow-y-auto">
          {/* Top Icon */}
          <div className="main pl-[180px]">
            <img src={icon} alt="Icon" className="mb-4 h-12" />
          </div>

          {/* Form Title */}
          <h1 className="text-2xl font-semibold text-left mb-6">Informations du titulaire</h1>

          {/* Name Input */}
          <div className="mb-4">
            <p className="mb-2 text-left">Nom*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* 2nd Name Input */}
          <div className="mb-4">
            <p className="mb-2 text-left">Prénom*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* Date of Birth Input */}
          <div className="mb-4">
            <p className="mb-2 text-left">Date de naissance*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* Professional ID Input */}
          <div className="mb-4">
            <p className="mb-2 text-left">Nom Professionnel Pharmacien*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* SIRET Input */}
          <div className="mb-4">
            <p className="mb-2 text-left">SIRET*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* Phone Number Input with Country Code */}
          <div className="mb-4">
            <p className="mb-2 text-left">Numéro de téléphone</p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <TextField
                select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="md:w-1/3 w-full"
                variant="outlined"
                size="small"
                sx={{
                  maxWidth: "150px",
                  backgroundColor: "#e2e8f0",  // Set background color
                  borderColor: "#e2e8f0",      // Set border color to the same as the background
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: "#e2e8f0", // Ensure the border of the fieldset is the same color
                    },
                    '&:hover fieldset': {
                      borderColor: "#e2e8f0", // Make sure the hover state matches too
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: "#e2e8f0", // Make sure the focused state matches as well
                    }
                  }
                }}
              >
                {countryOptions.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <ReactWorldFlags code={country.code} className="w-6 h-4" />
                      {country.dialCode}
                    </div>
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="ex: 087678866"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
                size="small"
                sx={{ maxWidth: '250px' }}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="my-6 flex items-start">
            <Checkbox required />
            <p className="text-sm px-2 text-left">J'accepte les Conditions Générales d'Utilisation, les <br />  <a
              href="/payment-terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Conditions Générales d'Utilisation du Service de Paiement,
            </a><br />et je  reconnais avoir lu la <u>Politique de Confidentialité</u>.</p>
          </div>

          {/* Submit Button */}
          <Link to="/page2">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
              sx={{ maxWidth: "400px", marginX: 'auto' }}
            >
              Accepter et Continuer
            </Button>
          </Link>
        </div>
      </div>

      {/* Inspector */}
      <LoginPagesInspector currentPage={currentPage} totalPages={3} />
    </div>
  );
};

export default Mui;
