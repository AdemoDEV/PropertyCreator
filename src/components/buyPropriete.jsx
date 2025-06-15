import React from "react";
import "./buyPropriete.css";
import { Eye, DollarSign, Trash2, KeyRound, Link2, FileText } from "lucide-react";

const appartdisponible = [
  {
    name: "Rue de Ademo Blaize",
    img: "/images/test1.png",
    rentPrice: 2200,
    buyPrice: 88000,
    desc: "Un bel appartement situé dans le centre-ville, parfait pour les jeunes professionnels.",
  },
];


function PropertyPanel({}) {
  return (
    <div className="property-grid-container">
      {appartdisponible.map((property, index) => (
        <div className="property-panel" key={index}>
            <div className="property-header">
             <div className="property-title">
               <KeyRound size={18} />
               <h2>{property.name}</h2>
             </div>
            </div>
            <div className="property-preview-buy">
              <img src={property.img} alt={property.name} className="property-preview-image-buy" />
            </div>

            <div className="description-section">
              <div className="description-title">
                <FileText size={16} />
                <strong>Description de la Propriété</strong>
              </div>
              <p>{property.desc}</p>
            </div>

            <div className="visit-button">
              <Eye size={16} />
              <span>Visiter l’Appartement</span>
            </div>

            <div className="green-button">
              <DollarSign size={16} />
              <span>Acheter cet Appartement</span>
              <span className="price">${property.buyPrice}</span>
            </div>


        </div>
      ))}
    </div>
  );
}

export default PropertyPanel;
