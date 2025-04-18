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
  orderNo,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for controlling the dialog visibility
  const cardBgColor = paymentStatus === 'Non payé' ? 'bg-[#FDA729]' : 'bg-[#0BAD38]';

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the dialog when "Annuler" is clicked
  };

  return (
    <div className="bg-white rounded-lg shadow-md"> {/* Added padding and rounded corners */}
      {/* Top section */}
      <div className={`${cardBgColor} flex flex-col justify-between p-4 rounded-lg mb-4`}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">{patientName}</h3>
          <span className="flex items-center text-white">
            {paymentStatus}
            {/* <img src={VectorIcon} alt="vector" className="w-4 h-4 ml-2" /> */}
          </span>
        </div>

        <div className="text-sm text-white mt-2">
          <div className="flex justify-between">
            <p>Commande n° {orderNumber}</p>
            <p>{deliveryDate}</p>
          </div>
          <div className="flex justify-between mt-1">
            <p>N° sécurité social :</p>
            <p>{socialSecurityNumber}</p>
          </div>
          <div className="flex justify-between mt-1">
            <p>Infirmier(e) :</p>
            <p>{nurseName}</p>
          </div>
        </div>
      </div>

      {/* Medicines */}
      <div className="mb-4 p-4">
        <div className="text-gray-800">
          {medications.map((medication, index) => (
            <div key={index}>{medication}</div>
          ))}
        </div>
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
              Transférer l’ordonnance
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
