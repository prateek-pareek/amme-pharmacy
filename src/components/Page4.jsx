import React from "react";
import { Button } from "@mui/material";
import icon from "../assets/PartyPopper.png"; // Adjust path if needed
import image from "../assets/Frame 436.png"; // Replace with the left image as shown in your design
import { Link } from "react-router-dom";


const Page4 = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center gap-6 p-4">
      {/* Left Section with Image */}
      <div className="md:w-2/5 w-full flex items-center justify-center bg-blue-500 rounded-lg">
        <img src={image} alt="Doctor and Patients" className="w-full h-auto" />
      </div>

      {/* Right Section with Message */}
      <div className="bg-white py-8 px-6 md:px-12 rounded-lg md:w-2/5 w-full text-center">
        {/* Celebration Icon */}
        <img src={icon} alt="Celebration Icon" className="mx-auto mb-4 h-12" />

        {/* Success Message */}
        <h1 className="text-2xl font-semibold mb-4">
          Congratulations, your account is under review!
        </h1>
        <p className="text-gray-600 mb-6">
          You will be able to log in once your account is validated.
        </p>

        {/* Finish Button */}
        <Link to="/page5">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
        //   onClick={() => alert("Thank you!")}
          >
          Finish
        </Button>
            </Link>
      </div>
    </div>
  );
};

export default Page4;
