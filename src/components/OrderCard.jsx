import { useState } from 'react';
import VectorIcon from "../assets/icons/Vector.svg";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from './dialog';
import { DialogHeader } from './dialog';

const OrderCard = ({
  patientName,
  orderNumber,
  deliveryDate,
  socialSecurityNumber,
  nurseName,
  medications,
  paymentStatus,
  timeSlot,
  postalAddress,
  prescriptionUrl
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for controlling the dialog visibility
  const cardBgColor = paymentStatus === 'Non payé' ? 'bg-[#FDA729]' : 'bg-[#0BAD38]';

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the dialog when "Annuler" is clicked
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{patientName}</h3>
          <p className="text-sm text-gray-500">Commande #{orderNumber}</p>
        </div>
        <span className={`px-2 py-1 rounded text-sm ${
          paymentStatus === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
        }`}>
          {paymentStatus === "confirmed" ? "Confirmé" : "En attente"}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Date:</span> {deliveryDate}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Horaire:</span> {timeSlot}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Adresse:</span> {postalAddress}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Infirmier(e):</span> {nurseName}
        </p>
        
        {medications && medications.length > 0 && (
          <div>
            <p className="font-medium text-sm text-gray-600 mb-1">Médicaments:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 pl-2">
              {medications.map((med, index) => (
                <li key={index}>{med}</li>
              ))}
            </ul>
          </div>
        )}

        {prescriptionUrl && (
          <div className="mt-3">
            <a 
              href={prescriptionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Voir l'ordonnance
            </a>
          </div>
        )}
      </div>

      {/* Payment button */}
      <div className="flex justify-center mt-4 p-4">
        {paymentStatus === 'Non payé' ? (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="bg-[#0C66E6] text-white p-2 rounded w-full">
                À payer
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Confirmation de commande</DialogTitle>
                <DialogDescription>
                  Voulez-vous valider la prise de cette commande ?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex space-x-2 mt-8">
                <button
                  className="bg-white text-[#0C66E6] border border-[#0C66E6] p-2 rounded w-1/2"
                  onClick={handleDialogClose} // Close the dialog when "Annuler" is clicked
                >
                  Annuler
                </button>
                <button className="bg-[#0C66E6] text-white p-2 rounded w-1/2">
                  Confirmer
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        ) : (
          <div className="flex flex-col items-stretch space-y-2 w-full">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
              <button className="bg-[#0C66E6] text-white p-2 rounded w-full"
                // onClick={() => setIsModalOpen(true)}
              >
                Commande prête
              </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>Confirmation de commande</DialogTitle>
                  <DialogDescription>
                    Voulez-vous valider la prise de cette commande ?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex space-x-2 mt-8">
                  <button
                    className="bg-white text-[#0C66E6] border border-[#0C66E6] p-2 rounded w-1/2"
                    onClick={handleDialogClose} // Close the dialog when "Annuler" is clicked
                  >
                    Annuler
                  </button>
                  <button className="bg-[#0C66E6] text-white p-2 rounded w-1/2">
                    Confirmer
                  </button>
                </DialogFooter>
              </DialogContent>
          </Dialog>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
            <button className="border border-[#0C66E6] text-[#0C66E6] p-2 rounded w-full">
              Transférer l'ordonnance
            </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Confirmation de commande</DialogTitle>
                <DialogDescription>
                  Voulez-vous valider la prise de cette commande ?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex space-x-2 mt-8">
                <button
                  className="bg-white text-[#0C66E6] border border-[#0C66E6] p-2 rounded w-1/2"
                  onClick={handleDialogClose} // Close the dialog when "Annuler" is clicked
                >
                  Annuler
                </button>
                <button className="bg-[#0C66E6] text-white p-2 rounded w-1/2">
                  Confirmer
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
