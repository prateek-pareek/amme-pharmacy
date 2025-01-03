import React, { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Calendar from "./Calendar"; // Adjust path if needed
import { CiSearch } from "react-icons/ci";
import { SlQuestion } from "react-icons/sl";
import { LuUser } from "react-icons/lu";

const Header = ({ selectedTab, setSelectedTab }) => {
  const [date, setDate] = useState(new Date()); // Internal state for date
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="w-full px-2 flex items-center justify-between mb-8">
      {/* Date Picker */}
      <div className="relative inline-block">
        <div
          className="flex items-center border rounded-md px-4 py-2 bg-white shadow-sm cursor-pointer"
          onClick={toggleCalendar}
        >
          <span className="text-gray-700 font-medium">{formattedDate}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 ml-2"
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
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setIsOpen(false);
              }}
            />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex-1 flex justify-center">
        <button
          onClick={() => setSelectedTab("En attente")}
          className={`text-[#0C66E6] font-medium rounded-md ${
            selectedTab === "En attente" ? "bg-white" : "bg-gray-200"
          } hover:bg-gray-300 focus:outline-none px-6 py-2`}
        >
          En attente
        </button>
        <button
          onClick={() => setSelectedTab("Prêtes")}
          className={`text-[#0C66E6] font-medium rounded-md ${
            selectedTab === "Prêtes" ? "bg-white" : "bg-gray-200"
          } hover:bg-gray-300 focus:outline-none px-6 py-2`}
        >
          Prêtes
        </button>
        <button
          onClick={() => setSelectedTab("Récupérées")}
          className={`text-[#0C66E6] font-medium rounded-md ${
            selectedTab === "Récupérées" ? "bg-white" : "bg-gray-200"
          } hover:bg-gray-300 focus:outline-none px-6 py-2`}
        >
          Récupérées
        </button>
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
        <div className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow">
          <SlQuestion className="w-full h-full" />
        </div>
        <div className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow">
          <LuUser className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Header;
