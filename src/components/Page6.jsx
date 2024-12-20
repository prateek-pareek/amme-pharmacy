import React, { useState } from "react";
import syringeIcon from "../assets/Syringe.png"; // Replace with the actual path if needed
import QuestionIcon from "../assets/icons/question.svg"
import SearchIcon from "../assets/icons/search.svg";
import UserIcon from "../assets/icons/user.svg";
import OrderCard from "./OrderCard";
import Calendar from "../components/UI/Calendar"
// import { format } from "date-fns";
import { fr } from "date-fns/locale"; // Import French locale
import { format } from "date-fns";

const Page6 = () => {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const formattedDate = format(date, "PPP", { locale: fr });
  const [selectedTab, setSelectedTab] = useState("En attente"); // Track selected tab

  
  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };  

 // Sample dummy data for cards
 const orders = [
  {
    id: 1,
    patientName: "Aliénor Petit",
    medications: ["1 LOVENOX 4000", "1 MEDISET", "2 Doliprane 1000mg", "3 SOLUPRED 5 mg"],
    deliveryDate: "2023-10-26",
    paymentStatus: "Non payé",
    orderNumber: "73",
    socialSecurityNumber: "1 85 05 78 006 084 36",
    nurseName: "Basilisse Lopez",
  },
  {
    id: 2,
    patientName: "Cléandre Roche",
    medications: ["1 Amoxicilline 500mg", "3 SOLUPRED 5mg", "6 Loratadine 10mg","1 LOVENOX 4000", "1 MEDISET", "2 Doliprane 1000mg", "3 SOLUPRED 5 mg"],
    deliveryDate: "2023-10-27",
    paymentStatus: "payé",
    orderNumber: "72",
    socialSecurityNumber: "2 93 06 45 009 087 12",
    nurseName: "Vincent Riviere",
  },
  {
    id: 3,
    patientName: "Éliane Dubois",
    medications: ["2 Ibuprofen 400mg", "1 Omeprazole 20mg", "4 Paracetamol 500mg"],
    deliveryDate: "2023-10-28",
    paymentStatus: "Non payé",
    orderNumber: "74",
    socialSecurityNumber: "1 84 04 38 002 056 34",
    nurseName: "Marie Bernard",
  },
  {
    id: 4,
    patientName: "René Lefèvre",
    medications: ["1 Cetirizine 10mg", "3 Aspirin 81mg", "2 Metformin 500mg"],
    deliveryDate: "2023-10-29",
    paymentStatus: "payé",
    orderNumber: "75",
    socialSecurityNumber: "1 94 05 65 004 093 22",
    nurseName: "Louis Dupont",
  },
  {
    id: 5,
    patientName: "Juliette Garnier",
    medications: ["1 Losartan 50mg", "2 Furosemide 40mg", "1 Amlodipine 10mg"],
    deliveryDate: "2023-10-30",
    paymentStatus: "Non payé",
    orderNumber: "76",
    socialSecurityNumber: "2 75 03 12 007 032 18",
    nurseName: "Emilie Moreau",
  },
  {
    id: 6,
    patientName: "Théo Laurent",
    medications: ["2 Simvastatin 20mg", "1 Aspirin 81mg", "3 Albuterol 90mcg"],
    deliveryDate: "2023-10-31",
    paymentStatus: "payé",
    orderNumber: "77",
    socialSecurityNumber: "1 92 08 44 003 071 45",
    nurseName: "Pierre Martin",
  },
  {
    id: 7,
    patientName: "Camille Morel",
    medications: ["1 Omeprazole 40mg", "2 Cetirizine 10mg", "4 Ibuprofen 200mg"],
    deliveryDate: "2023-11-01",
    paymentStatus: "Non payé",
    orderNumber: "78",
    socialSecurityNumber: "2 83 02 24 008 064 27",
    nurseName: "Lucie Perrin",
  },
  {
    id: 8,
    patientName: "Mathis Simon",
    medications: ["1 Metformin 850mg", "3 Simvastatin 40mg", "2 Paracetamol 1000mg"],
    deliveryDate: "2023-11-02",
    paymentStatus: "payé",
    orderNumber: "79",
    socialSecurityNumber: "1 97 06 49 001 091 56",
    nurseName: "Sophie Girard",
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
<div className="flex-1 flex justify-center" >
  <button
    onClick={() => setSelectedTab("En attente")}
    className={`text-[#0C66E6] font-medium rounded-md ${
      selectedTab === "En attente" ? "bg-white" : "bg-gray-200"} hover:bg-gray-300 
    }  focus:outline-none px-6 py-2 `}
  >
    En attente
  </button>
  <button
    onClick={() => setSelectedTab("Prêtes")}
    className={`text-[#0C66E6] font-medium rounded-md ${
      selectedTab === "Prêtes" ? "bg-white" : "bg-gray-200"} hover:bg-gray-300 
    }  focus:outline-none px-6 py-2 `}
  >
    Prêtes
  </button>
  <button
    onClick={() => setSelectedTab("Récupérées")}
    className={`text-[#0C66E6] font-medium rounded-md ${
      selectedTab === "Récupérées" ? "bg-white" : "bg-gray-200"} hover:bg-gray-300 
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
      
          <div className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow">
            <img src={QuestionIcon} alt="Help" className="w-full h-full" />
          </div>

          <div className="w-12 h-12 rounded-lg p-3 bg-[#F6F7F9] shadow">
            <img src={UserIcon} alt="User" className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow w-full">
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
            <img src={syringeIcon} alt="Syringe Icon" className="w-24 h-24 mb-6" />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Aucune commande prévue aujourd&apos;hui.
            </h2>
            <p className="text-gray-500 text-center">
              Lorsqu&lsquo;une nouvelle commande est programmée, elle apparaîtra ici.
            </p>
          </>
        )}
      </div>
    </div>
  );
};


export default Page6;
