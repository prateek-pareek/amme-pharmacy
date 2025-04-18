import React, { useState, useEffect, useRef } from "react";
import { format, isSameDay, isBefore, isAfter } from "date-fns";
import { fr } from "date-fns/locale";
import Calendar from "./Calendar";
import { CiSearch, CiCalendar, CiFlag1, CiMail } from "react-icons/ci";
import { SlQuestion } from "react-icons/sl";
import { LuUser } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import ProfileModal from "./ProfileModal";
import HelpModal from "./HelpModal";

const Header = ({ 
  selectedTab, 
  setSelectedTab, 
  dateRange, 
  setDateRange, 
  onSearch, 
  availableNames = [],
  clearSearch 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const calendarRef = useRef(null);
  const searchRef = useRef(null);

  const formatDateRange = () => {
    if (!dateRange.startDate) {
      return "Aujourd'hui";
    }
    
    const startFormatted = format(dateRange.startDate, "dd MMM", { locale: fr });
    if (!dateRange.endDate) {
      return startFormatted;
    }
    
    const endFormatted = format(dateRange.endDate, "dd MMM", { locale: fr });
    return `${startFormatted} au ${endFormatted}`;
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleReset = (e) => {
    e.stopPropagation(); // Prevent calendar from opening
    setDateRange({ startDate: null, endDate: null });
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchQuery("");
      setSuggestions([]);
    } else if (clearSearch) {
      clearSearch();
    }
  };

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 0) {
      // Filter available names based on query
      const filteredSuggestions = availableNames.filter(name => 
        name.fullName.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5)); // Limit to 5 suggestions
    } else {
      setSuggestions([]);
      if (clearSearch) {
        clearSearch();
      }
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim());
      }
      setSuggestions([]); // Clear suggestions after search
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.fullName);
    if (onSearch) {
      onSearch(suggestion.fullName);
    }
    setSuggestions([]);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (clearSearch) {
      clearSearch();
    }
    setSuggestions([]);
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
    
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isDateRangeSelected = dateRange.startDate && dateRange.endDate;

  return (
    <div className="w-full py-5 flex items-center justify-between shadow-sm shadow-b-0 border-b-2 mb-7">
      <div className="flex items-center gap-2">
        {/* Date Picker */}
        <div className="relative inline-block" ref={calendarRef}>
          <div
            className={`flex items-center rounded-md px-4 py-2 cursor-pointer ${
              isDateRangeSelected ? 'bg-blue-500 text-white' : 'bg-white border shadow-sm'
            }`}
            onClick={toggleCalendar}
          >
            <CiCalendar className={`h-5 w-5 mr-2 ${isDateRangeSelected ? 'text-white' : 'text-gray-400'}`} />
            <span className={`font-medium ${isDateRangeSelected ? 'text-white' : 'text-gray-700'}`}>
              {formatDateRange()}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ml-2 ${isDateRangeSelected ? 'text-white' : 'text-gray-400'} ${
                isOpen ? "transform rotate-180" : ""
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
            <div className="absolute top-full mt-2 z-10">
              <Calendar
                onSelectRange={(range) => {
                  setDateRange(range);
                  setIsOpen(false);
                }}
                dayClassName={(date) => {
                  if (isSameDay(date, new Date())) return "text-[#0c66e6]";
                  if (isBefore(date, new Date())) return "text-[#818ea0]";
                  if (isAfter(date, new Date())) return "text-[#151515]";
                  return "";
                }}
                firstDayOfWeek={1}
                locale={fr}
              />
            </div>
          )}
        </div>

        {/* Reset Button */}
        {isDateRangeSelected && (
          <button
            onClick={handleReset}
            className="px-4 py-2 text-blue-500 hover:text-blue-700 font-medium"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex-1 flex justify-center">
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
          <div className="relative" ref={searchRef}>
            <div className="flex items-center bg-white rounded-lg shadow px-3 py-2 w-64 h-12">
              <CiSearch className="w-4 h-4 mr-2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                onKeyDown={handleSearchSubmit}
                placeholder="Rechercher par nom..."
                className="outline-none border-none w-48"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <IoClose className="w-4 h-4" />
                </button>
              )}
              {/* <button
                onClick={toggleSearch}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button> */}
            </div>
            
            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span>{suggestion.fullName}</span>
                    <span className="text-xs text-gray-500">{suggestion.type}</span>
                  </div>
                ))}
              </div>
            )}
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

      <ProfileModal isOpen={isProfileModalOpen} toggleModal={toggleProfileModal} />
      <HelpModal isOpen={isHelpModalOpen} toggleModal={toggleHelpModal} />
    </div>
  );
};

export default Header;