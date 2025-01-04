import React, { useEffect } from "react";
import { CiFlag1 } from "react-icons/ci";

const ProfileModal = ({ isOpen, toggleModal }) => {
    // Effect to handle closing the modal when clicking outside
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

    // If the modal is not open, return null
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-start justify-end bg-black bg-opacity-50 z-50 modal-backdrop">
            {/* Modal Container */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-[464px] h-[95%] mt-[20px] mr-[0px] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-semibold text-gray-800">Profil</h2>
                    {/* Close Button */}
                    <button onClick={toggleModal} className="text-black hover:text-gray-700 text-5xl">
                        &times;
                    </button>
                </div>
                {/* Modal Form */}
                <form className="space-y-4">
    {/* Name and Surname Inputs */}
    <div className="flex space-x-4">
        <div className="flex-1">
            <label className="block text-base font-thin text-black">Nom*</label>
            <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-0 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <div className="flex-1">
            <label className="block text-base font-thin text-black">Prénom*</label>
            <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-0 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    </div>
    {/* Date of Birth Input */}
    <div>
        <label className="block text-base font-thin text-black">Date de naissance*</label>
        <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-0 focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
    {/* Professional Pharmacist Number Input */}
    <div>
        <label className="block text-base font-thin text-black">Numéro professionnel pharmacien*</label>
        <input
            type="number"
            className="w-full border border-gray-300 rounded-md px-3 py-0 focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
    {/* SIRET Number Input */}
    <div>
        <label className="block text-base font-thin text-black">SIRET*</label>
        <input
            type="number"
            className="w-full border border-gray-300 rounded-md px-3 py-0 focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
    {/* Phone Number Input */}
    <div>
        <label className="block text-base font-thin text-black">Numéro de téléphone*</label>
        <div className="flex items-center">
            <div className="flex items-center border border-gray-300 rounded-l-md px-3 py-0 bg-gray-50">
                <CiFlag1 className="w-5 h-5 mr-2" />
                <select className="outline-none bg-transparent">
                    <option value="+33">+33</option>
                    {/* Add other country codes if needed */}
                </select>
            </div>
            <input
                type="text"
                className="flex-1 border-t border-b border-r border-gray-300 rounded-r-md px-3 py-0 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    </div>
    {/* Pharmacy Name Input */}
    <div>
        <label className="block text-base font-thin text-black">Nom de votre pharmacie*</label>
        <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-0 focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
    {/* Pharmacy Address Input */}
    <div>
        <label className="block text-base font-thin text-black">Adresse de votre pharmacie*</label>
        <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-0 focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
    {/* Pharmacy Email Input */}
    <div>
        <label className="block text-base font-thin text-black">Adresse mail de votre pharmacie*</label>
        <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-3 py-0 focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
    {/* Form Buttons */}
    <div className="flex justify-end space-x-4" style={{ marginTop: '125px', marginBottom: '0px' }}>
        <button
            type="button"
            onClick={toggleModal}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
        >
            Annuler
        </button>
        <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
            Confirmer
        </button>
    </div>
</form>




            </div>
        </div>
    );
};

export default ProfileModal;
