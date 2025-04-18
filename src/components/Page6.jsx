import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import { isBefore, isAfter, parseISO, startOfDay, endOfDay } from "date-fns";
import syringeIcon from "../assets/Syringe.png";
import OrderCard from "./OrderCard";
import Header from "./UI/Header";

const Page6 = () => {
  const [selectedTab, setSelectedTab] = useState("En attente");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [availableNames, setAvailableNames] = useState([]);

  useEffect(() => {
    // Fetch appointments data when component mounts
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        // Try using Bearer format
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          setLoading(false);
          return;
        }

        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://amme-api-pied.vercel.app/api/pharmacist/appointments/jitu@gmail.com?token=${encodeURIComponent(token)}`,
        };

        const response = await axios.request(config);
        const appointmentsData = response.data.appointments;
        setAppointments(appointmentsData);
        
        // Extract all available names from the appointments
        const names = [];
        appointmentsData.forEach(appointment => {
          // Add patient name
          if (appointment.patientName) {
            names.push({
              fullName: appointment.patientName,
              type: "Patient"
            });
          }
          
          // Add nurse name
          if (appointment.preferredNurseName) {
            names.push({
              fullName: appointment.preferredNurseName,
              type: "Infirmier(e)"
            });
          }
        });
        
        // Remove duplicates
        const uniqueNames = names.filter((name, index, self) =>
          index === self.findIndex(n => n.fullName === name.fullName)
        );
        
        setAvailableNames(uniqueNames);
        setLoading(false);
      } catch (err) {
        console.error(err);
        
        // If you're getting CORS errors, provide a more specific message
        if (err.message === 'Network Error') {
          setError("CORS Error: Unable to connect to the API. This is likely a server configuration issue.");
        } else {
          const errorMessage = err.response?.data?.message || "Failed to load appointments";
          setError(errorMessage);
        }
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Map API appointments to order format expected by OrderCard
  const mappedOrders = appointments.map((appointment, index) => {
    // Extract medicines from prescriptionText if available
    const medications = appointment.prescriptionText?.medicines || 
                       (appointment.prescriptionUrl ? ["Prescription disponible"] : []);
    
    return {
      id: appointment._id,
      patientName: appointment.patientName,
      medications: medications,
      date: appointment.date ? parseISO(appointment.date) : null, // Store original date for filtering
      deliveryDate: appointment.date ? new Date(appointment.date).toLocaleDateString('fr-FR') : "Date non définie",
      paymentStatus: appointment.status === "pending" ? "Non payé" : "payé",
      orderNumber: index + 1,
      socialSecurityNumber: appointment.userId || "Non disponible",
      nurseName: appointment.preferredNurseName || "Non assigné",
    };
  });
  
  // Search function
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Filter orders based on selected tab, date range and search query
  const filteredOrders = mappedOrders.filter((order) => {
    // First filter by tab
    const tabFilter = 
      selectedTab === "Prêtes" ? order.paymentStatus === "Non payé" :
      selectedTab === "Récupérées" ? order.paymentStatus === "payé" :
      true;
    
    // Then filter by date range if both dates are set
    let dateFilter = true;
    if (dateRange.startDate && dateRange.endDate && order.date) {
      // Check if order date is within the selected range
      // startOfDay and endOfDay ensure we include the entire day
      dateFilter = 
        !isBefore(order.date, startOfDay(dateRange.startDate)) && 
        !isAfter(order.date, endOfDay(dateRange.endDate));
    }
    
    // Then filter by search query
    let searchFilter = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      searchFilter = 
        (order.patientName && order.patientName.toLowerCase().includes(query)) || 
        (order.nurseName && order.nurseName.toLowerCase().includes(query));
    }
    
    return tabFilter && dateFilter && searchFilter;
  });

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-50 p-4 w-full">
      <Header 
        selectedTab={selectedTab} 
        setSelectedTab={setSelectedTab} 
        dateRange={dateRange}
        setDateRange={setDateRange}
        onSearch={handleSearch}
        availableNames={availableNames}
        clearSearch={clearSearch}
      />
      
      <div className="w-full max-w-7xl mx-auto">
        {/* Search status indicator */}
        {/* {searchQuery && (
          <div className="flex items-center justify-between mb-4 px-4 py-2 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <span className="text-blue-600 font-medium">
                Recherche: "{searchQuery}"
              </span>
              <span className="ml-2 text-gray-500">
                {filteredOrders.length} résultat(s) trouvé(s)
              </span>
            </div>
            <button
              onClick={clearSearch}
              className="text-blue-600 hover:text-blue-800"
            >
              Effacer
            </button>
          </div>
        )} */}
      
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-12">
            <p className="text-gray-600">Chargement des commandes...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center mt-12">
            <p className="text-red-500">{error}</p>
            {error.includes("token") && (
              <button 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => window.location.href = "/LoginPage"}
              >
                Se connecter
              </button>
            )}
          </div>
        ) : filteredOrders.length > 0 ? (
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
                    orderNo={order.id}
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
              {searchQuery ? 
                "Aucune commande ne correspond à votre recherche." : 
                dateRange.startDate && dateRange.endDate ? 
                "Aucune commande trouvée pour la période sélectionnée." : 
                "Aucune commande prévue aujourd'hui."}
            </h2>
            <p className="text-gray-500 text-center">
              {searchQuery ? 
                "Veuillez essayer avec un autre nom ou effacer la recherche." :
                dateRange.startDate && dateRange.endDate ? 
                "Veuillez essayer une autre période ou réinitialiser le filtre de date." : 
                "Lorsqu'une nouvelle commande est programmée, elle apparaîtra ici."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page6;

