import React, { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
// import QuestionIcon from "../assets/icons/question.svg";
// import UserIcon from "../assets/icons/user.svg";
import { LuUser } from "react-icons/lu";
// import FlagIcon from "../assets/icons/flag.svg";
import OrderCard from "./OrderCard";
import { CiSearch } from "react-icons/ci";
import { SlQuestion } from "react-icons/sl";
import { CiFlag1 } from "react-icons/ci";




function Page29() {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("Récupérées");
  const formattedDate = format(date, "PPP", { locale: fr });

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const orders = [
    {
      id: 1,
      patientName: "Aliénor Petit",
      medications: [
        "1 LOVENOX 4000",
        "1 MEDISET",
        "2 Doliprane 1000mg",
        "3 SOLUPRED 5 mg",
      ],
      deliveryDate: "2023-10-26",
      paymentStatus: "payé",
      orderNumber: "73",
      socialSecurityNumber: "1 85 05 78 006 084 36",
      nurseName: "Basilisse Lopez",
    },
  ];

  // Filter orders based on selected tab
  const filteredOrders = orders.filter((order) => {
    if (selectedTab === "Prêtes") {
      return order.paymentStatus === "Non payé";
    } else if (selectedTab === "Récupérées") {
      return order.paymentStatus === "payé";
    } else if (selectedTab === "En attente") {
      return true; // Show both non payé and payé orders
    }
    return true;
  });

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      // Reset search query when opening search
      setSearchQuery("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-50 p-4 w-full">
      {/* Top Section: Date and Tabs */}
      <div className="w-full px-2 flex items-center justify-between mb-8">
        {/* Date Picker */}
        <div className="relative inline-block">
          <div
            className="flex items-center border rounded-md px-4 py-2 bg-white shadow-sm cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
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

          {/* {isOpen && (
        <div className="absolute top-full mt-2 z-10 bg-white border rounded-md shadow-lg">
          <Calendar
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setIsOpen(false);
                }}
              />
        </div>
      )} */}
        </div>

        {/* Tabs */}
        <div className="flex-1 flex justify-center">
          <button
            className={`text-[#0C66E6] font-medium rounded-md ${
              selectedTab === "En attente" ? "bg-white" : "bg-gray-200"
            } hover:bg-gray-300 
    }  focus:outline-none px-6 py-2 `}
          >
            En attente
          </button>
          <button
            className={`text-[#0C66E6] font-medium rounded-md ${
              selectedTab === "Prêtes" ? "bg-white" : "bg-gray-200"
            } hover:bg-gray-300 
    }  focus:outline-none px-6 py-2 `}
          >
            Prêtes
          </button>
          <button
            onClick={() => setSelectedTab("Récupérées")}
            className={`text-[#0C66E6] font-medium rounded-md ${
              selectedTab === "Récupérées" ? "bg-white" : "bg-gray-200"
            } hover:bg-gray-300 
    }  focus:outline-none px-6 py-2 `}
          >
            Récupérées
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {showSearch ? (
            <div className="flex items-center bg-white rounded-lg shadow px-3 py-2 w-64 h-12 ">
              {/* <img src={SearchIcon} alt="Search" className="w-4 h-4 mr-2" /> */}
              <CiSearch  className="w-4 h-4 mr-2"/>
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
              {/* <img src={SearchIcon} alt="Search" className="w-full h-full" /> */}
              <CiSearch className="w-full h-full"/>
            </div>
          )}

          <div className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow cursor-pointer">
            {/* <img
              src={QuestionIcon}
              alt="Help"
              className="w-full h-full"
            /> */}
            <SlQuestion />
          </div>

          <div className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow cursor-pointer">
            {/* <img src={UserIcon} alt="User" className="w-full h-full" onClick={toggleModal} /> */}
            <LuUser onClick={toggleModal} size={24}/>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow w-full ">
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full auto-rows-min">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                patientName={order.patientName}
                orderNumber={order.orderNumber}
                deliveryDate={order.deliveryDate}
                socialSecurityNumber={order.socialSecurityNumber}
                nurseName={order.nurseName}
                medications={order.medications}
                paymentStatus={order.paymentStatus}
                orderNo={order.orderNo}
              />
            ))}
          </div>
        ) : (
          <>
            <img
              src={syringeIcon}
              alt="Syringe Icon"
              className="w-24 h-24 mb-6"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Aucune commande prévue aujourd&apos;hui.
            </h2>
            <p className="text-gray-500 text-center">
              Lorsqu&lsquo;une nouvelle commande est programmée, elle apparaîtra
              ici.
            </p>
          </>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
  <div
    className="fixed h-[780px] w-[464px] mt-[4px] ml-[1200px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-6 overflow-y-auto"
    role="dialog"
  >
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Profil</h2>
    <form className="space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Nom*
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Garcia"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Prénom*
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Leo"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Date de naissance*
        </label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="02/09/1980"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Numéro professionnel pharmacien*
        </label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="10101010101"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          SIRET*
        </label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="123 456 789 01234"
        />
      </div>
      <div>
  <label className="block text-sm font-medium text-gray-700">
    Numéro de téléphone*
  </label>
  <div className="flex items-center">
    <div className="flex items-center border border-gray-300 rounded-l-md px-3 py-2 bg-gray-50">
      {/* <img
        src={FlagIcon}
        alt="flag"
        className="w-5 h-5 mr-2"
      /> */}

        <CiFlag1 className="w-5 h-5 mr-2"/>
      <select
        className="outline-none bg-transparent"
      >
        <option value="+33">+33</option>
        {/* Add other country codes if needed */}
      </select>
    </div>
    <input
      type="text"
      className="flex-1 border-t border-b border-r border-gray-300 rounded-r-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="9 32 54 92 09"
    />
  </div>
</div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nom de votre pharmacie*
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Naturalia"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Adresse de votre pharmacie*
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="12 Rue de la Santé, 75013 Paris, France"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Adresse mail de votre pharmacie*
        </label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="contact@pharmacie-naturalia.fr"
        />
      </div>
      <div className="flex justify-end mt-4 space-x-4">
        <button
          type="button"
          onClick={toggleModal}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
        >
          Annuler
        </button>
        <button
          
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Confirmer
        </button>
      </div>
    </form>
  </div>
)}

    </div>
  );
}

export default Page29;
