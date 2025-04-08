import React, { useEffect, useState } from "react";
import { CiFlag1 } from "react-icons/ci";
import axios from "axios";

const ProfileModal = ({ isOpen, toggleModal }) => {
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

    // Fetch profile data when modal opens
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('https://amme-api-pied.vercel.app/pharmacist/profile');
                setFormData(response.data); // assuming response.data has the correct shape
            } catch (error) {
                console.error('Error fetching profile:', error);
                alert('Failed to load profile. Please try again.');
            }
        };

        if (isOpen) {
            fetchProfile();
        }
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(
                'https://amme-api-pied.vercel.app/pharmacist/update-user',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Profile updated:', response.data);
            toggleModal(); // Close modal on success
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Close modal on outside click
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