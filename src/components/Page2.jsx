import React, { useState, useEffect } from "react";
import { TextField, Button, Alert, Snackbar } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import icon from "../assets/Frame 401.png"; // Adjust path if needed
import image from "../assets/Frame 436.png";
import { Link, useNavigate } from "react-router-dom";
import LoginPagesInspector from "./UI/LoginPagesInspecter";
import axios from "axios";

const Page2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const navigate = useNavigate();

  // States for password requirements
  const [minLength, setMinLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasUpperAndLower, setHasUpperAndLower] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  // Add sessionId to your state
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Check password requirements
    setMinLength(password.length >= 10);
    setHasNumber(/[0-9]/.test(password));
    setHasUpperAndLower(/[a-z]/.test(password) && /[A-Z]/.test(password));
    setHasSymbol(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  }, [password]);

  useEffect(() => {
    // Get sessionId from localStorage when component mounts
    const storedSessionId = localStorage?.getItem("sessionId");
    
    if (storedSessionId) {
      setSessionId(storedSessionId);
      console.log("Retrieved sessionId:", storedSessionId);
    } else {
      console.log("Using fallback sessionId for testing");
      
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!email || !password || !confirmPassword) {
      setError("Tous les champs sont obligatoires");
      setOpenSnackbar(true);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setOpenSnackbar(true);
      return;
    }

    if (!(minLength && hasNumber && hasUpperAndLower && hasSymbol)) {
      setError("Le mot de passe ne respecte pas les critères requis");
      setOpenSnackbar(true);
      return;
    }

    try {
      setLoading(true);
      
      // Use the sessionId from state instead of getting it again
      if (!sessionId) {
        setError("Session invalide. Veuillez recommencer depuis la première étape.");
        setOpenSnackbar(true);
        navigate("/");
        return;
      }
      
      console.log("Submitting data:", { 
        sessionId, 
        email, 
        password: "********",
        passwordConfirm: "********" 
      });
      
      const response = await axios.post("https://amme-api-pied.vercel.app/api/pharmacist/step2", {
        sessionId,
        email,
        password,
        passwordConfirm: confirmPassword
      });
      
      console.log("API Response:", response.data);
      
      // Save sessionId to localStorage
      localStorage.setItem('sessionId', response.data?.sessionId || response.data?._id);
      
      // If successful, navigate to next page
      navigate("/page3");
    } catch (err) {
      console.error("API Error:", err);
      
      if (err.response) {
        console.error("Error data:", err.response.data);
        console.error("Error status:", err.response.status);
        
        if (err.response.status === 400 && err.response.data.message?.includes("Invalid session")) {
          setError("Session invalide. Veuillez recommencer depuis la première étape.");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else if (err.response.status === 400 && err.response.data.message?.includes("Email already registered as a Patient")) {
          setError("Cette adresse e-mail est déjà enregistrée en tant que patient. Veuillez utiliser une autre adresse.");
        } else if (err.response.status === 400 && err.response.data.message?.includes("Email already registered")) {
          setError("Cette adresse e-mail est déjà enregistrée. Veuillez utiliser une autre adresse.");
        } else if (err.response.status === 500) {
          setError("Erreur serveur. Veuillez contacter l'administrateur ou réessayer plus tard.");
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(`Erreur (${err.response.status}): Veuillez réessayer.`);
        }
      } else if (err.request) {
        // Request was made but no response received
        console.error("Error request:", err.request);
        setError("Aucune réponse du serveur. Vérifiez votre connexion Internet.");
      } else {
        // Error setting up request
        console.error("Error message:", err.message);
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
      
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
        <form onSubmit={handleSubmit} className="bg-white py-8 rounded-lg w-full md:w-[90%] px-6 h-full flex flex-col justify-between overflow-y-auto">
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
            sx={{ maxWidth: '400px' }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Chargement..." : "Continuer"}
          </Button>
        </form>
      </div>

      {/* Inspector */}
      <LoginPagesInspector currentPage={currentPage} totalPages={3} />
      
      {/* Error Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Page2;
