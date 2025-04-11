import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import icon from "../assets/Frame 401.png"; // Adjust path if needed
import image from "../assets/Frame 436.png";
import { Link, useNavigate } from "react-router-dom";
import LoginPagesInspector from "./UI/LoginPagesInspecter";
import axios from "axios";

const Page3 = () => {
  const [currentPage, setCurrentPage] = useState(3); // Add state for current page
  const [pharmacyName, setPharmacyName] = useState("");
  const [pharmacyAddress, setPharmacyAddress] = useState("");
  const [email, setEmail] = useState(""); // Add email state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Get sessionId from localStorage when component mounts
    const storedSessionId = localStorage?.getItem("sessionId");
    
    if (storedSessionId && storedSessionId !== "undefined") {
      setSessionId(storedSessionId);
      console.log("Retrieved sessionId:", storedSessionId);
    } else {
      // Check if we're in development mode, use fallback
      // Store the fallback ID for future use
      console.log('error in session id')
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Use the sessionId from state instead of fetching it again
      if (!sessionId) {
        setError("Session invalide. Veuillez recommencer depuis la première étape.");
        return;
      }
      
      const response = await axios.post(
        "https://amme-api-pied.vercel.app/api/pharmacist/step3",
        {
          sessionId,
          pharmacyName,
          pharmacyAddress
        },
        {
          headers: { 
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log(response.data);
      
      // Save updated sessionId to localStorage (if the API returns it)
      if (response.data?.sessionId || response.data?._id) {
        localStorage.setItem('sessionId', response.data?.sessionId || response.data?._id);
      }
      
      navigate("/page4");
    } catch (err) {
      console.error(err);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[100vh] items-center justify-between gap-6 p-4 overflow-auto relative">
      {/* Left Section with Image */}
      <div className="md:w-[50%] w-full flex flex-w items-center ">
        <img
          src={image}
          alt="Logo"
          className="md:w-4/5 min-h-[95vh] h-[95vh] rounded-lg"
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
          <h1 className="text-2xl font-semibold text-left mb-6">
          Ma pharmacie</h1>

          <form onSubmit={handleSubmit}>
            {/* Pharmacy Name Input */}
            <div className="mb-4">
              <p className="mb-2">Nom de votre pharmacie*</p>
              <TextField
                variant="outlined"
                fullWidth
                required
                value={pharmacyName}
                onChange={(e) => setPharmacyName(e.target.value)}
                size="small"
                sx={{ maxWidth: '400px' }}
              />
            </div>

            {/* Pharmacy Address Input */}
            <div className="mb-4">
              <p className="mb-2">Adresse de votre pharmacie*</p>
              <TextField
                variant="outlined"
                fullWidth
                required
                value={pharmacyAddress}
                onChange={(e) => setPharmacyAddress(e.target.value)}
                size="small"
                sx={{ maxWidth: '400px' }}
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              className="mt-4"
              disabled={loading}
              sx={{ maxWidth: '400px' }}
            >
              {loading ? "Chargement..." : "Terminer"}
            </Button>
          </form>
        </div>
      </div>

      {/* Inspector */}
      <LoginPagesInspector currentPage={currentPage} totalPages={3} />
    </div>
  );
};

export default Page3;