import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import icon from "../assets/Frame 401.png"; // Adjust path if needed
import image from "../assets/Frame 436.png";
import { useNavigate } from "react-router-dom";
import LoginPagesInspector from "./UI/LoginPagesInspecter";
import { POST } from "../backend/axiosconfig"; // ✅ Custom POST method

const Page3 = () => {
  const navigate = useNavigate();
  const [currentPage] = useState(3);
  const [pharmacyName, setPharmacyName] = useState("");
  const [pharmacyAddress, setPharmacyAddress] = useState("");

  const handleSubmit = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");

      const payload = {
        sessionId,
        pharmacyName,
        pharmacyAddress,
      };

      const response = await POST("pharmacist/step3", payload);

      console.log("Step 3 Success:", response);
      navigate("/page4");
    } catch (error) {
      console.error("Step 3 Error:", error?.response?.data || error.message);
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

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
            sx={{ maxWidth: '400px' }}
            disabled={!pharmacyName || !pharmacyAddress}
            onClick={handleSubmit}
          >
            Terminer
          </Button>
        </div>
      </div>

      {/* Inspector */}
      <LoginPagesInspector currentPage={currentPage} totalPages={3} />
    </div>
  );
};

export default Page3;