import React, { useState } from "react";
import { TextField, Button, Checkbox, MenuItem } from "@mui/material";
import ReactWorldFlags from "react-world-flags";
import icon from "../assets/Frame 401.png";
import image from "../assets/Frame 436.png";
import { useNavigate } from "react-router-dom";
import LoginPagesInspector from "./UI/LoginPagesInspecter";
import axios from "axios";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [professionalPharmacistNumber, setProfessionalPharmacistNumber] = useState("");
  const [siretNumber, setSiretNumber] = useState("");
  const [currentPage] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Validation check
    if (!firstName || !lastName || !dob || !professionalPharmacistNumber || !siretNumber || !phoneNumber) {
        alert("Veuillez remplir tous les champs obligatoires");
        return;
    }

    const payload = {
        firstName,
        lastName,
        dob,
        professionalPharmacistNumber,
        siretNumber,
        phoneNumber
    };

    console.log("Sending step1 payload:", payload);

    // Direct axios call to match the working example
    axios({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://amme-api-pied.vercel.app/api/pharmacist/step1',
        headers: { 
            'Content-Type': 'application/json'
        },
        data: payload
    })
    .then((response) => {
        console.log("Step 1 Success:", response.data);
        
        // IMPORTANT: Save sessionId to localStorage
        if (response.data && response.data.sessionId) {
            console.log("Saving sessionId to localStorage:", response.data.sessionId);
            localStorage.setItem("sessionId", response.data.sessionId);
        } else {
            console.error("No sessionId in response:", response.data);
            alert("Error: No session ID received from server");
            return;
        }

        // Verify the sessionId was saved correctly
        const savedSessionId = localStorage.getItem("sessionId");
        console.log("Verified sessionId in localStorage:", savedSessionId);
        
        navigate("/page2");
    })
    .catch((error) => {
        console.error("API Error:", error?.response?.data || error);
        alert("Erreur lors de l'envoi du formulaire.");
    });
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
          <div className="main pl-[180px]">
            <img src={icon} alt="Icon" className="mb-4 h-12" />
          </div>

          <h1 className="text-2xl font-semibold text-left mb-6">Informations du titulaire</h1>

          {/* First Name */}
          <div className="mb-4">
            <p className="mb-2 text-left">Nom*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <p className="mb-2 text-left">Prénom*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* DOB */}
          <div className="mb-4">
            <p className="mb-2 text-left">Date de naissance*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* Pharmacist Number */}
          <div className="mb-4">
            <p className="mb-2 text-left">Nom Professionnel Pharmacien*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              value={professionalPharmacistNumber}
              onChange={(e) => setProfessionalPharmacistNumber(e.target.value)}
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* SIRET */}
          <div className="mb-4">
            <p className="mb-2 text-left">SIRET*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              value={siretNumber}
              onChange={(e) => setSiretNumber(e.target.value)}
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* Phone Number + Country Code */}
          <div className="mb-4">
            <p className="mb-2 text-left">Numéro de téléphone</p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <TextField
                select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="md:w-1/3 w-full"
                variant="outlined"
                size="small"
                sx={{
                  maxWidth: "150px",
                  backgroundColor: "#e2e8f0",
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: "#e2e8f0" },
                    '&:hover fieldset': { borderColor: "#e2e8f0" },
                    '&.Mui-focused fieldset': { borderColor: "#e2e8f0" },
                  },
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
                required
                size="small"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={{ maxWidth: '250px' }}
              />
            </div>
          </div>

          {/* Terms */}
          <div className="my-6 flex items-start">
            <Checkbox required />
            <p className="text-sm px-2 text-left">
              J'accepte les Conditions Générales d'Utilisation, les <br />
              <a
                href="/payment-terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Conditions Générales d'Utilisation du Service de Paiement,
              </a><br />
              et je reconnais avoir lu la <u>Politique de Confidentialité</u>.
            </p>
          </div>

          {/* Submit */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            className="mt-4"
            sx={{ maxWidth: "400px", marginX: 'auto' }}
          >
            Accepter et Continuer
          </Button>
        </div>
      </div>

      {/* Inspector */}
      <LoginPagesInspector currentPage={currentPage} totalPages={3} />
    </div>
  );
};

export default Mui;