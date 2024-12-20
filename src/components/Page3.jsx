import React, { useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import icon from "../assets/Frame 401.png"; // Adjust path if needed
import image from "../assets/Frame 436.png";
import { Link } from "react-router-dom";

const Page3 = () => {
    const [pharmacyName, setPharmacyName] = useState("");
    const [pharmacyAddress, setPharmacyAddress] = useState("");

    const handleClearAddress = () => {
        setPharmacyAddress("");
    };

    const handleSubmit = () => {
        if (!pharmacyName || !pharmacyAddress) {
            // alert("Please fill out all fields.");
        } else {
            console.log({ pharmacyName, pharmacyAddress });
            // alert("Form submitted successfully!");
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
                <h1 className="text-2xl font-semibold text-center mb-6">Ma pharmacie</h1>

                {/* Pharmacy Name Input */}
                <div className="my-2">
                    <p className="my-2">Nom de votre pharmacie*</p>
                    <TextField
                        label="Nom de la pharmacie"
                        variant="outlined"
                        fullWidth
                        required
                        value={pharmacyName}
                        onChange={(e) => setPharmacyName(e.target.value)}
                    />
                </div>

                {/* Pharmacy Address Input */}
                <div className="my-2">
                    <p className="my-2">Adresse de votre pharmacie*</p>
                    <div className="flex items-center">
                        <TextField
                            label="Adresse de la pharmacie"
                            variant="outlined"
                            fullWidth
                            required
                            value={pharmacyAddress}
                            onChange={(e) => setPharmacyAddress(e.target.value)}
                        />
                        {pharmacyAddress && (
                            <IconButton onClick={handleClearAddress} aria-label="Clear Address">
                                <ClearIcon style={{ color: "red" }} />
                            </IconButton>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <Link to="/page4">
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="mt-4"
                        onClick={handleSubmit}
                    >
                        Soumettre
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Page3;
