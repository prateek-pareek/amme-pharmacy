import React, { useState, useEffect, useRef } from "react";
import { format, isSameDay, isBefore, isAfter } from "date-fns";
import { fr } from "date-fns/locale";
import Calendar from "./Calendar"; // Adjust path if needed
import { CiSearch, CiCalendar, CiFlag1, CiMail } from "react-icons/ci";
import { SlQuestion } from "react-icons/sl";
import { LuUser } from "react-icons/lu";
import { FaPhoneAlt } from "react-icons/fa";
import ProfileModal from "./ProfileModal"; // Adjust the path if needed
import HelpModal from "./HelpModal"; // Adjust the path if needed

const Header = ({ selectedTab, setSelectedTab }) => {
  const [date, setDate] = useState(new Date()); // Internal state for date
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const calendarRef = useRef(null);

  const formattedDate = date
    ? format(date, "PPP", { locale: fr })
    : "Invalid Date";

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchQuery("");
    }
  };

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  const toggleHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full py-5 flex items-center justify-between shadow-sm shadow-b-0 border-b-2 mb-7">
      {/* Date Picker */}
      <div className="relative inline-block" ref={calendarRef}>
        <div
          className="flex items-center border rounded-md px-4 py-2 bg-white shadow-sm cursor-pointer"
          onClick={toggleCalendar}
        >
          <CiCalendar className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-gray-700 font-medium">Aujourd'hui - </span>
          <span className="text-gray-700 font-medium">{formattedDate}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-gray-400 ml-2 ${isOpen ? "transform rotate-180" : ""
              }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.292 7.707a1 1 0 011.416-1.414L10 9.585l3.292-3.292a1 1 0 011.416 1.414l-4 4a1 1 0 01-1.416 0l-4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {isOpen && (
          <div className="absolute top-full mt-2 z-10 bg-white border rounded-md shadow-lg">
            <Calendar
              selected={date}
              onSelectRange={({ startDate, endDate }) => {
                setDate(startDate);
                setIsOpen(false);
              }}
              dayClassName={(date) => {
                if (isSameDay(date, new Date())) return "text-[#0c66e6]";
                if (isBefore(date, new Date())) return "text-[#818ea0]";
                if (isAfter(date, new Date())) return "text-[#151515]";
                return "";
              }}
              firstDayOfWeek={1} // Start week from Monday (1)
              locale={fr}
            />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex-1 flex justify-center ">
        <div className="p-2 bg-gray-100 rounded-lg">
          <button
            onClick={() => setSelectedTab("En attente")}
            className={`text-[#0C66E6] font-medium rounded-md ${
              selectedTab === "En attente" ? "bg-white" : "bg-gray-100"
            } hover:bg-gray-300 focus:outline-none px-14 py-2`}
          >
            En attente
          </button>
          <button
            onClick={() => setSelectedTab("Prêtes")}
            className={`text-[#0C66E6] font-medium rounded-md ${
              selectedTab === "Prêtes" ? "bg-white" : "bg-gray-100"
            } hover:bg-gray-300 focus:outline-none px-14 py-2`}
          >
            Prêtes
          </button>
          <button
            onClick={() => setSelectedTab("Récupérées")}
            className={`text-[#0C66E6] font-medium rounded-md ${
              selectedTab === "Récupérées" ? "bg-white" : "bg-gray-100"
            } hover:bg-gray-300 focus:outline-none px-14 py-2`}
          >
            Récupérées
          </button>
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        {showSearch ? (
          <div className="flex items-center bg-white rounded-lg shadow px-3 py-2 w-64 h-12">
            <CiSearch className="w-4 h-4 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none border-none w-48"
              autoFocus
            />
            <button
              onClick={toggleSearch}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        ) : (
          <div
            className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow cursor-pointer hover:bg-gray-200"
            onClick={toggleSearch}
          >
            <CiSearch className="w-full h-full" />
          </div>
        )}
        <div
          className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow cursor-pointer"
          onClick={toggleHelpModal}
        >
          <SlQuestion className="w-full h-full" />
        </div>
        <div
          className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow cursor-pointer"
          onClick={toggleProfileModal}
        >
          <LuUser className="w-full h-full" />
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileModalOpen} toggleModal={toggleProfileModal} />

      {/* Help Modal */}
      <HelpModal isOpen={isHelpModalOpen} toggleModal={toggleHelpModal} />
    </div>
  );
};

export default Header;
