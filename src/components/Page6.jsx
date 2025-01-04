import React, { useState } from "react";
import Masonry from "react-masonry-css";
import syringeIcon from "../assets/Syringe.png";
import OrderCard from "./OrderCard";
import Header from "./UI/Header";

const Page6 = () => {
  const [selectedTab, setSelectedTab] = useState("En attente");
  
  // Your existing orders data
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
        paymentStatus: "Non payé",
        orderNumber: "73",
        socialSecurityNumber: "1 85 05 78 006 084 36",
        nurseName: "Basilisse Lopez",
    },
    {
        id: 2,
        patientName: "Cléandre Roche",
        medications: [
            "1 Amoxicilline 500mg",
            "3 SOLUPRED 5mg",
            "6 Loratadine 10mg",
            "1 LOVENOX 4000",
            "1 MEDISET",
            "2 Doliprane 1000mg",
            "3 SOLUPRED 5 mg",
        ],
        deliveryDate: "2023-10-27",
        paymentStatus: "payé",
        orderNumber: "72",
        socialSecurityNumber: "2 93 06 45 009 087 12",
        nurseName: "Vincent Riviere",
    },
    {
        id: 3,
        patientName: "Éliane Dubois",
        medications: [
            "2 Ibuprofen 400mg",
            "1 Omeprazole 20mg",
            "4 Paracetamol 500mg",
        ],
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
        medications: [
            "1 Losartan 50mg",
            "2 Furosemide 40mg",
            "1 Amlodipine 10mg",
        ],
        deliveryDate: "2023-10-30",
        paymentStatus: "Non payé",
        orderNumber: "76",
        socialSecurityNumber: "2 75 03 12 007 032 18",
        nurseName: "Emilie Moreau",
    },
    {
        id: 6,
        patientName: "Théo Laurent",
        medications: [
            "2 Simvastatin 20mg",
            "1 Aspirin 81mg",
            "3 Albuterol 90mcg",
        ],
        deliveryDate: "2023-10-31",
        paymentStatus: "payé",
        orderNumber: "77",
        socialSecurityNumber: "1 92 08 44 003 071 45",
        nurseName: "Pierre Martin",
    },
    {
        id: 7,
        patientName: "Camille Morel",
        medications: [
            "1 Omeprazole 40mg",
            "2 Cetirizine 10mg",
            "4 Ibuprofen 200mg",
        ],
        deliveryDate: "2023-11-01",
        paymentStatus: "Non payé",
        orderNumber: "78",
        socialSecurityNumber: "2 83 02 24 008 064 27",
        nurseName: "Lucie Perrin",
    },
    {
        id: 8,
        patientName: "Mathis Simon",
        medications: [
            "1 Metformin 850mg",
            "3 Simvastatin 40mg",
            "2 Paracetamol 1000mg",
        ],
        deliveryDate: "2023-11-02",
        paymentStatus: "payé",
        orderNumber: "79",
        socialSecurityNumber: "1 97 06 49 001 091 56",
        nurseName: "Sophie Girard",
    },
];

  const filteredOrders = orders.filter((order) => {
    if (selectedTab === "Prêtes") {
      return order.paymentStatus === "Non payé";
    } else if (selectedTab === "Récupérées") {
      return order.paymentStatus === "payé";
    }
    return true;
  });

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-50 p-4 w-full">
      <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      
      <div className="w-full max-w-7xl mx-auto">
        {filteredOrders.length > 0 ? (
          <div className="w-full">
            <style>
              {`
                .my-masonry-grid {
                  display: flex;
                  width: auto;
                  margin-left: -16px; /* Adjust this value for gap */
                }
                .my-masonry-grid_column {
                  padding-left: 16px; /* Adjust this value for gap */
                  background-clip: padding-box;
                }
                .my-masonry-grid_column > div {
                  margin-bottom: 16px; /* Adjust this value for vertical gap */
                }
              `}
            </style>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {filteredOrders.map((order) => (
                <div key={order.id}>
                  <OrderCard
                    patientName={order.patientName}
                    orderNumber={order.orderNumber}
                    deliveryDate={order.deliveryDate}
                    socialSecurityNumber={order.socialSecurityNumber}
                    nurseName={order.nurseName}
                    medications={order.medications}
                    paymentStatus={order.paymentStatus}
                    orderNo={order.orderNo}
                  />
                </div>
              ))}
            </Masonry>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-12">
            <img
              src={syringeIcon}
              alt="Syringe Icon"
              className="w-24 h-24 mb-6"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Aucune commande prévue aujourd'hui.
            </h2>
            <p className="text-gray-500 text-center">
              Lorsqu'une nouvelle commande est programmée, elle apparaîtra ici.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page6;