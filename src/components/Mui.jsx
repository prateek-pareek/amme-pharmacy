import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, MenuItem } from "@mui/material";
import ReactWorldFlags from "react-world-flags";
import icon from "../assets/Frame 401.png"; // Adjust path if needed
import image from "../assets/Frame 436.png";
import { Link } from "react-router-dom";

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

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

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
        <div className="bg-white py-8 rounded-lg w-full md:w-[90%]  px-6">
          {/* Top Icon */}
          <div className="main pl-[180px]">
          <img src={icon} alt="Icon" className=" mb-4 h-12" />
          </div>

          {/* Form Title */}
          <h1 className="text-2xl font-semibold text-left mb-6">Informations du titulaire</h1>

          {/* Name Input */}
          <div className="mb-4">
            <p className="mb-2 text-left">Nom</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* First Name Input */}
          <div className="mb-4">
            <p className="mb-2 text-left">Prénom</p>
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
            <p className="mb-2 text-left">Date de naissance</p>
            <TextField
              variant="outlined"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              size="small"
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* Professional ID Input */}
          <div className="mb-4">
            <p className="mb-2 text-left">Nom Professionnel Pharmacien</p>
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
            <p className="mb-2 text-left">SIRET</p>
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
                sx={{ maxWidth: "150px", backgroundColor: "#e2e8f0" }}
                
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
          <div className="my-10 flex items-start">
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

    </div>
  );
};

export default Mui;
