import React, { useState } from "react";
import syringeIcon from "../assets/Syringe.png"; // Replace with the actual path if needed
import QuestionIcon from "../assets/icons/question.svg"
import SearchIcon from "../assets/icons/search.svg";
import UserIcon from "../assets/icons/user.svg";
import CalenderIcon from "../assets/icons/calender.svg";

const Page5 = () => {
   const [selectedTab, setSelectedTab] = useState("En attente");

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-50 p-4 w-full">
      {/* Top Section: Date and Tabs */}
      <div className="w-full px-2 flex items-center justify-between mb-8">
        {/* Date Picker */}
        <div className="flex items-center border rounded-md px-4 py-2 bg-white shadow-sm flex-grow-0">
          {/* <img src={CalenderIcon} alt="Calendar" className="w-6 h-6" /> */}
          <span className="text-gray-700 font-medium">Aujourd'hui - 19 Sep 2024</span>
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

        {/* Tabs */}
        <div className="flex-1 flex justify-center">
          <button onClick={() => setSelectedTab("En attente")}
          className={`text-[#0C66E6] font-medium rounded-md ${
      selectedTab === "En attente" ? "bg-white" : "bg-gray-200"} hover:bg-gray-300 
    }  focus:outline-none px-6 py-2 `}>
            En attente
          </button>
          <button onClick={() => setSelectedTab("Prêtes")}
    className={`text-[#0C66E6] font-medium rounded-md ${
      selectedTab === "Prêtes" ? "bg-white" : "bg-gray-200"} hover:bg-gray-300 
    }  focus:outline-none px-6 py-2 `}>
            Prêtes  
          </button>
          <button onClick={() => setSelectedTab("Récupérées")}
    className={`text-[#0C66E6] font-medium rounded-md ${
      selectedTab === "Prêtes" ? "bg-white" : "bg-gray-200"} hover:bg-gray-300 
    }  focus:outline-none px-6 py-2 `}>
            Récupérées
          </button>
        </div>
     

      {/* Icons */}
      <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow">
            <img src={QuestionIcon} alt="Help" className="w-full h-full" />
          </div>
      
          <div className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow">
            <img src={SearchIcon} alt="Search" className="w-full h-full" />
          </div>

          <div className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow">
            <img src={UserIcon} alt="User" className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <img
          src={syringeIcon}
          alt="Syringe Icon"
          className="w-24 h-24 mb-6"
        />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Pas de commande prévue aujourd’hui.
        </h2>
        <p className="text-gray-500 text-center">
          Lorsqu’une nouvelle commande sera programmée, elle s’affichera ici.
        </p>
      </div>
    </div>
  );
};

export default Page5;
