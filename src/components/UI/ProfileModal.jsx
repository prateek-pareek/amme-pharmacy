import React, { useEffect, useState } from "react";
import { CiFlag1 } from "react-icons/ci";
import axios from "axios";

const ProfileModal = ({ isOpen, toggleModal }) => {
    // Initialize with empty values
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        professionalPharmacistNumber: '',
        siretNumber: '',
        phoneNumber: '',
        pharmacyName: '',
        pharmacyAddress: '',
        pharmacyEmail: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Load data from localStorage when modal opens
    useEffect(() => {
        if (!isOpen) return;
        
        // Function to load signup data from localStorage
        const loadUserDataFromStorage = () => {
            console.log("Loading user data from localStorage");
            
            // Step 1: We need to check if sessionId exists (confirms signup process started)
            const sessionId = localStorage.getItem("sessionId");
            
            if (sessionId) {
                console.log("Found sessionId in localStorage:", sessionId);
                
                // Initialize data object with any persisted values
                let storedData = {};
                
                // Try to load the data entered in each step of signup
                try {
                    // Try to find directly stored fields first (from step01.jsx)
                    const storedSignupFields = {
                        firstName: localStorage.getItem("firstName"),
                        lastName: localStorage.getItem("lastName"),
                        dob: localStorage.getItem("dob"),
                        professionalPharmacistNumber: localStorage.getItem("professionalPharmacistNumber"),
                        siretNumber: localStorage.getItem("siretNumber"),
                        phoneNumber: localStorage.getItem("phoneNumber"),
                        
                        // Step 2 (from Page2.jsx)
                        pharmacyEmail: localStorage.getItem("email"),
                        
                        // Step 3 (from Page3.jsx)
                        pharmacyName: localStorage.getItem("pharmacyName"),
                        pharmacyAddress: localStorage.getItem("pharmacyAddress")
                    };
                    
                    // Filter out null/undefined values
                    Object.entries(storedSignupFields).forEach(([key, value]) => {
                        if (value) {
                            storedData[key] = value;
                        }
                    });
                    
                    // Also check for a previously saved complete profile object
                    const savedProfile = localStorage.getItem("savedProfile");
                    if (savedProfile) {
                        try {
                            const parsedProfile = JSON.parse(savedProfile);
                            storedData = { ...storedData, ...parsedProfile };
                            console.log("Loaded saved profile:", parsedProfile);
                        } catch (e) {
                            console.error("Error parsing saved profile:", e);
                        }
                    }
                    
                    console.log("Final data to use:", storedData);
                    
                    // Use the stored data if we have any
                    if (Object.keys(storedData).length > 0) {
                        setFormData(prevData => ({ ...prevData, ...storedData }));
                    }
                } catch (e) {
                    console.error("Error loading data from localStorage:", e);
                }
            }
        };
        
        // Load data from localStorage
        loadUserDataFromStorage();
        
    }, [isOpen]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Update state
        setFormData(prevState => {
            const newData = {
                ...prevState,
                [name]: value
            };
            
            // Save the entire form state to localStorage
            localStorage.setItem("savedProfile", JSON.stringify(newData));
            
            return newData;
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            // Save the current form data to localStorage
            localStorage.setItem("savedProfile", JSON.stringify(formData));
            
            // Individual fields for easier access
            Object.entries(formData).forEach(([key, value]) => {
                if (value) localStorage.setItem(key, value);
            });
            
            alert("Profile information saved successfully!");
            toggleModal();
        } catch (err) {
            console.error("Error saving profile:", err);
            setError("There was an error saving your profile.");
        } finally {
            setLoading(false);
        }
    };

    // Handle outside click to close modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && event.target.classList.contains('modal-backdrop')) {
                toggleModal();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, toggleModal]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-start justify-end bg-black bg-opacity-50 z-50 modal-backdrop">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-[464px] h-[95%] mt-[20px] mr-[0px] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-semibold text-gray-800">Profil</h2>
                    <button onClick={toggleModal} className="text-black hover:text-gray-700 text-5xl">&times;</button>
                </div>

                {error && (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Name & Surname */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-base font-thin text-black">Nom*</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-0 h-9"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-base font-thin text-black">Prénom*</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-0 h-9"
                            />
                        </div>
                    </div>

                    {/* DOB */}
                    <div>
                        <label className="block text-base font-thin text-black">Date de naissance*</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-0 h-9"
                        />
                    </div>

                    {/* Professional Number */}
                    <div>
                        <label className="block text-base font-thin text-black">Numéro professionnel pharmacien*</label>
                        <input
                            type="number"
                            name="professionalPharmacistNumber"
                            value={formData.professionalPharmacistNumber}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-0 h-9"
                        />
                    </div>

                    {/* SIRET */}
                    <div>
                        <label className="block text-base font-thin text-black">SIRET*</label>
                        <input
                            type="number"
                            name="siretNumber"
                            value={formData.siretNumber}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-0 h-9"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-base font-thin text-black">Numéro de téléphone*</label>
                        <div className="flex items-center">
                            <div className="flex items-center border border-gray-300 rounded-l-md px-3 py-0 bg-gray-50">
                                <CiFlag1 className="w-5 h-5 mr-2" />
                                <select className="outline-none bg-transparent h-9">
                                    <option value="+33">+33</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="flex-1 border-t border-b border-r border-gray-300 rounded-r-md px-3 py-0 h-9"
                            />
                        </div>
                    </div>

                    {/* Pharmacy Name */}
                    <div>
                        <label className="block text-base font-thin text-black">Nom de votre pharmacie*</label>
                        <input
                            type="text"
                            name="pharmacyName"
                            value={formData.pharmacyName}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-0 h-9"
                        />
                    </div>

                    {/* Pharmacy Address */}
                    <div>
                        <label className="block text-base font-thin text-black">Adresse de votre pharmacie*</label>
                        <input
                            type="text"
                            name="pharmacyAddress"
                            value={formData.pharmacyAddress}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-0 h-9"
                        />
                    </div>

                    {/* Pharmacy Email */}
                    <div>
                        <label className="block text-base font-thin text-black">Adresse mail de votre pharmacie*</label>
                        <input
                            type="email"
                            name="pharmacyEmail"
                            value={formData.pharmacyEmail}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-0 h-9"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4 mt-[7vh]">
                        <button
                            type="button"
                            onClick={toggleModal}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {loading ? 'Chargement...' : 'Confirmer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;