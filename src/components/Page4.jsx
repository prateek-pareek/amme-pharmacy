import React from "react";
import { Button } from "@mui/material";
import icon from "../assets/PartyPopper.png"; // Adjust path if needed
import image from "../assets/Frame 436.png"; // Replace with the left image as shown in your design
import { Link } from "react-router-dom";


const Page4 = () => {
  return (
    <div className="flex flex-col md:flex-row h-[100vh] items-center justify-between gap-6 p-4 overflow-hidden">

      {/* Left Section with Image */}
      <div className="md:w-[50%] w-full flex items-center ">

        <img src={image} alt="Doctor and Patients" className="w-[85%] h-auto" />
      </div>

      {/* Right Section with Message */}
      <div className="md:pr-12 md:w-[50%] flex items-center justify-center">

        <div className="bg-white py-8 px-6 md:px-8 rounded-lg md:w-2/5 w-full text-center">
          {/* Celebration Icon */}
          <img src={icon} alt="Celebration Icon" className="mx-auto mb-4 h-12" />

          {/* Success Message */}
          <h1 className="text-2xl font-semibold mb-4">
          Félicitations votre compte est en cours de validation!
          </h1>
          <p className="text-gray-600 mb-6">
          Vous pourrez vous identifier lorsque votre compte sera validé
          </p>

          {/* Finish Button */}
          <Link to="/page6">
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
    </div>
  );
};

export default Page4;
