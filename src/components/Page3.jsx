import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import icon from "../assets/Frame 401.png"; // Adjust path if needed
import image from "../assets/Frame 436.png";
import { Link } from "react-router-dom";
import LoginPagesInspector from "./UI/LoginPagesInspecter";

const Page3 = () => {
  const [currentPage, setCurrentPage] = useState(3); // Add state for current page

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
        <div className="bg-white py-8 rounded-lg w-full md:w-[90%] px-6 flex flex-col justify-between h-full">
          {/* Top Icon */}
          <div className="main pl-[180px] mb-6">
            <img src={icon} alt="Icon" className="mb-4 h-12" />
          </div>

          {/* Form Title */}
          <h1 className="text-2xl font-semibold text-left mb-6">
            Ma pharmacie
          </h1>

          {/* Pharmacy Name Input */}
          <div className="mb-4 flex-grow">
            <p className="mb-2">Nom de votre pharmacie*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* Pharmacy Address Input */}
          <div className="mb-4 flex-grow">
            <p className="mb-2">Adresse de votre pharmacie*</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ maxWidth: '400px' }}
            />
          </div>

          {/* Submit Button */}
          <Link to="/page4">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
              sx={{ maxWidth: '400px', marginX: 'auto' }}
            >
              Terminer
            </Button>
          </Link>
        </div>
      </div>

      {/* Inspector */}
      <LoginPagesInspector currentPage={currentPage} totalPages={3} />
    </div>
  );
};

export default Page3;
