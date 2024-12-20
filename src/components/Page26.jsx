import React, { useState } from "react";
import Calendar from "./UI/Calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import QuestionIcon from "../assets/icons/question.svg";
import SearchIcon from "../assets/icons/search.svg";
import UserIcon from "../assets/icons/user.svg";
import MailIcon from "../assets/icons/mail.svg";
import PhoneIcon from "../assets/icons/phone.svg";
import OrderCard from "./OrderCard";

function Page26() {
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
              <img src={SearchIcon} alt="Search" className="w-4 h-4 mr-2" />
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
              <img src={SearchIcon} alt="Search" className="w-full h-full" />
            </div>
          )}

          <div className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow cursor-pointer">
            <img
              src={QuestionIcon}
              alt="Help"
              className="w-full h-full"
              onClick={toggleModal}
            />
          </div>

          <div className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow">
            <img src={UserIcon} alt="User" className="w-full h-full" />
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
          className="fixed bottom-5 right-5 h-[411px] w-[439px] bg-white border border-gray-300 rounded-lg shadow-lg z-50"
          role="dialog"
        >
          {/* Header */}
          <div className=" p-6">
            <h3 className="text-[24px] font-semibold text-[#151515]">Besoin d’aide ?</h3>
            <p className="text-[16px] font-normal text-[#151515] mt-1">
              Sélectionnez un moyen de communication afin que l’on puisse vous aider.
            </p>
          </div>

          {/* Content */}
          <div className="p-4 mt-1 ">
            {/* Phone Contact */}
            <div className="flex items-center justify-between w-[391px] h-[68px] mt-1 bg-[#F6F7F9] p-3 rounded-md shadow-sm">
              <div className="flex items-center space-x-3">
                <img src={PhoneIcon} alt="Phone" className="w-6 h-6" />
                <p className="text-sm font-medium text-gray-800">+33 4 57 34 87 40</p>
              </div>
              <p className="text-xs text-gray-500">De 9h à 17h</p>
            </div>
            {/* Email Contact */}
            <div className="flex items-center w-[391px] h-[68px] mt-4 bg-[#F6F7F9] p-3 rounded-md shadow-sm">
              <div className="flex items-center space-x-3">
                <img src={MailIcon} alt="Email" className="w-6 h-6" />
                <p className="text-sm font-medium text-gray-800">support@amme.fr</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className=" p-4 text-center mb-4">
            <button
              className="bg-[#0C66E6] text-white w-full py-2 rounded-md hover:bg-blue-700"
              onClick={toggleModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page26;
