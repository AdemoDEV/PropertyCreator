import React from "react";
import "./buyPropriete.css";
import { Eye, BanknoteArrowDown, Car, Trash2, KeyRound, Link2, FileText } from "lucide-react";
import { notify } from "../utils/Notify";

const appartdisponible = [
  {
    type: "property-all",
    name: "Rue de Ademo Blaize",
    img: "/images/test1.png",
    rentPrice: 22000000,
    buyPrice: 88000,
    desc: "Un bel appartement situé dans le centre-ville, parfait pour les jeunes professionnels.",
  },
];


function PropertyPanel({}) {

  function handleRent(property) {
    notify({
      title: "Location de Propriété",
      message: `Vous avez loué ${property.name} pour $${property.rentPrice}.`,
      timeout: 5000,
      advanced: false,
      dark: true,
      url: "ems"
    });
  }

  function handleBuy(property) {
    notify({
      title: "Achat de Propriété",
      message: `Vous avez acheté ${property.name} pour $${property.buyPrice}.`,
      timeout: 5000,
      advanced: false,
      dark: true,
      url: "ems"
    });
  }

  return (
    <div className="property-grid-container">
      {appartdisponible.map((property, index) => {
      const name = property.type === "property-all" ? "Propriété et Garage" : property.type === "property" ? "Propriété" : "Garage";
        const showAppartement = property.type === "property-all" || property.type === "property";
        const showGarage      = property.type === "property-all" || property.type === "garage";
        return (
            <div className="property-panel" key={index}>
                <div className="property-header">
                 <div className="property-title">
                   <KeyRound className="icon-key" size={18} />
                   <p>{property.name}</p>
                   <h3 className="type-name">({name})</h3>
                 </div>
                </div>
                <div className="property-preview-buy">
                  <img src={property.img} alt={property.name} className="property-preview-image-buy" />
                </div>

               {showAppartement && (
                <div className="visit-button">
                  <Eye className="icon-key" size={17} />
                  <span>Visiter l’Appartement</span>
                </div>
               )} 

              {showGarage && (
                <div className="visit-button-garage">
                  <Car className="icon-key" size={17} />
                  <span>Visiter le Garage</span>
                </div>
              )} 

                 <div className="action-buttons-row">
                  <button className="green-button" onClick={() => handleBuy(property)}>
                    <BanknoteArrowDown size={17} />
                    <span>Acheter cet Appartement</span>
                    <span className="price">${property.buyPrice}</span>
                  </button>

                  <button
                    className="rent-button"
                    onClick={() => handleRent(property)}
                  >
                    <BanknoteArrowDown size={17} />
                    <span>Louer cet Appartement</span>
                    <span className="price2">${property.rentPrice}</span>
                  </button>
                </div>

            </div>
        );
      })}
    </div>
  );
}

export default PropertyPanel;
