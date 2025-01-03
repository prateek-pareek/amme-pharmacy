import React, { useState } from "react";
import syringeIcon from "../assets/Syringe.png"; // Replace with the actual path if needed
// import QuestionIcon from "../assets/icons/question.svg"
// import SearchIcon from "../assets/icons/search.svg";
// import UserIcon from "../assets/icons/user.svg";
import { CiSearch } from "react-icons/ci";
import { SlQuestion } from "react-icons/sl";
import { LuUser } from "react-icons/lu";
import Header from "./UI/Header";

const Page5 = () => {
   const [selectedTab, setSelectedTab] = useState("En attente");

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-50 p-4 w-full">
      <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

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
