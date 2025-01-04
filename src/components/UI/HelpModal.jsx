import React, { useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const HelpModal = ({ isOpen, toggleModal }) => {
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
    <div className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-50 modal-backdrop">
      <div
        className="fixed bottom-5 right-5 h-[411px] w-[439px] bg-white border border-gray-300 rounded-lg shadow-lg z-50"
        role="dialog"
      >
        {/* Header */}
        <div className="p-6">
          <h3 className="text-[24px] font-semibold text-[#151515]">Besoin d’aide ?</h3>
          <p className="text-[16px] font-normal text-[#151515] mt-1">
            Sélectionnez un moyen de communication afin que l’on puisse vous aider.
          </p>
        </div>

        {/* Content */}
        <div className="p-4 mt-1">
          {/* Phone Contact */}
          <div className="flex items-center justify-between w-[391px] h-[68px] mt-1 bg-[#F6F7F9] p-3 rounded-md shadow-sm">
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="w-6 h-6" />
              <p className="text-sm font-medium text-gray-800">+33 4 57 34 87 40</p>
            </div>
            <p className="text-xs text-gray-500">De 9h à 17h</p>
          </div>
          {/* Email Contact */}
          <div className="flex items-center w-[391px] h-[68px] mt-4 bg-[#F6F7F9] p-3 rounded-md shadow-sm">
            <div className="flex items-center space-x-3">
              <CiMail className="w-6 h-6" />
              <p className="text-sm font-medium text-gray-800">support@amme.fr</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center mb-4">
          <button
            className="bg-[#0C66E6] text-white w-full py-2 rounded-md hover:bg-blue-700"
            onClick={toggleModal}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
