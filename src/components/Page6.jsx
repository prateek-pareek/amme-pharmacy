import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import syringeIcon from "../assets/Syringe.png";
import OrderCard from "./OrderCard";
import Header from "./UI/Header";

const Page6 = () => {
  const [selectedTab, setSelectedTab] = useState("En attente");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments data
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        setAppointments(data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    if (selectedTab === "Prêtes") {
      return appointment.status === "pending";
    } else if (selectedTab === "Récupérées") {
      return appointment.status === "confirmed";
    }
    return true;
  });

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  // Format medications from prescriptionText if available
  const getMedications = (appointment) => {
    if (appointment.prescriptionText?.medicines) {
      return appointment.prescriptionText.medicines;
    }
    return []; // Return empty array if no medications found
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-50 p-4 w-full">
      <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      
      <div className="w-full max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredAppointments.length > 0 ? (
          <div className="w-full">
            <style>
              {`
                .my-masonry-grid {
                  display: flex;
                  width: auto;
                  margin-left: -16px;
                }
                .my-masonry-grid_column {
                  padding-left: 16px;
                  background-clip: padding-box;
                }
                .my-masonry-grid_column > div {
                  margin-bottom: 16px;
                }
              `}
            </style>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {filteredAppointments.map((appointment) => (
                <div key={appointment._id}>
                  <OrderCard
                    patientName={appointment.patientName}
                    orderNumber={appointment._id.substring(0, 8)} // Using first 8 chars of _id as order number
                    deliveryDate={new Date(appointment.date).toLocaleDateString()}
                    socialSecurityNumber={appointment.userId} // Using userId as a placeholder
                    nurseName={appointment.preferredNurseName}
                    medications={getMedications(appointment)}
                    paymentStatus={appointment.status}
                    timeSlot={appointment.timeSlot}
                    postalAddress={appointment.postalAddress}
                    prescriptionUrl={appointment.prescriptionUrl}
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