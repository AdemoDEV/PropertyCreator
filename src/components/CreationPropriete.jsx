import React, { useState, useEffect } from "react";
import { MapPin, ChevronLeft, ChevronRight, Check, Home, BadgeDollarSign, Layers, House } from "lucide-react";
import "./creationPropriete.css";

const propertyModels = {
  "Bas de gamme": [
    { name: "Studio A", img: "/images/test1.png", desc: "Petit studio fonctionnel pour débutants." },
    { name: "T1 Simple", img: "/images/test2.png", desc: "Appartement une pièce économique." },
  ],
  "Moyen de gamme": [
    { name: "T2 Confort", img: "/images/studio-a.png", desc: "Appartement deux pièces bien situé." },
    { name: "Loft Urbain", img: "/images/studio-a.png", desc: "Loft moderne en centre-ville." },
  ],
  Luxe: [
    { name: "Penthouse", img: "/images/studio-a.png", desc: "Vue imprenable avec prestations haut de gamme." },
    { name: "Villa Bord de Mer", img: "/images/studio-a.png", desc: "Villa luxueuse avec accès plage." },
  ],
};

const garages = [
  { size: "2 places", img: "/images/studio-a.png", desc: "Garage pour 2 véhicules." },
  { size: "4 places", img: "/images/studio-a.png", desc: "Garage pour 4 véhicules." },
  { size: "10 places", img: "/images/studio-a.png", desc: "Garage spacieux pour collectionneurs." },
];

export default function PropertyCreator() {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("Bas de gamme");
  const [modelIndex, setModelIndex] = useState(0);
  const [modelSelected, setModelSelected] = useState(false);
  const [garageEnabled, setGarageEnabled] = useState(false);
  const [HouseEnabled, setHouseEnabled] = useState(false);
  const [garageIndex, setGarageIndex] = useState(0);
  const [garageSelected, setGarageSelected] = useState(false);
  const [positionEntree, setPositionEntree] = useState(null);
  const [positionSortie, setPositionSortie] = useState(null);
  const [garageEntree, setGarageEntree] = useState(null);
  const [garageSortie, setGarageSortie] = useState(null);

  const currentModel = propertyModels[categorie][modelIndex];
  const currentGarage = garages[garageIndex];

  useEffect(() => {
    setModelIndex(0);
    setModelSelected(false);
  }, [categorie]);

  const enregistrerPosition = (type) => {
    const pos = { x: 0, y: 0, z: 0 };
    if (type === "entree") setPositionEntree(pos);
    else if (type === "sortie") setPositionSortie(pos);
    else if (type === "garage_entree") setGarageEntree(pos);
    else if (type === "garage_sortie") setGarageSortie(pos);
  };

  const suivantModele = () => {
    setModelIndex((i) => (i + 1) % propertyModels[categorie].length);
    setModelSelected(false);
  };
  const precedentModele = () => {
    setModelIndex((i) => (i - 1 + propertyModels[categorie].length) % propertyModels[categorie].length);
    setModelSelected(false);
  };

  const suivantGarage = () => {
    setGarageIndex((i) => (i + 1) % garages.length);
    setGarageSelected(false);
  };
  const precedentGarage = () => {
    setGarageIndex((i) => (i - 1 + garages.length) % garages.length);
    setGarageSelected(false);
  };
  const GetPosition = (type) => {
       if (type === "all") {
            if (!positionEntree || !positionSortie || !garageEntree || !garageSortie) {
                alert("Veuillez définir toutes les positions (entrée, sortie, garage entrée, garage sortie)");
                return;
            }
        } else if (type=== "maison") {
            if (!positionEntree || !positionSortie) {
                alert("Veuillez définir les positions d'entrée et de sortie de la maison");
                return;
            }
        } else if (type === "garage") {
            if (!garageEntree || !garageSortie) {
                alert("Veuillez définir les positions d'entrée et de sortie du garage");
                return;
            }
        }
  };

  const handleSubmit = () => {
    if (!nom || !prix) {
      alert("Nom et prix obligatoires");
      return;
    }

    if (HouseEnabled && garageEnabled) {
        if (!positionEntree || !positionSortie || !garageEntree || !garageSortie) {
            alert("Veuillez définir toutes les positions (entrée, sortie, garage entrée, garage sortie)");
            return;
        }
        const payload = {
            nom,
            prix: Number(prix),
            categorie,
            modele: currentModel,
            positionEntree,
            positionSortie,
            garage: garageSelected ? {
              ...currentGarage,
              positionEntree: garageEntree,
              positionSortie: garageSortie
            } : null,
        };
        console.log(payload);
    alert("Maison et Garage crée !");
    } else if (HouseEnabled) {
        if (!positionEntree || !positionSortie) {
            alert("Veuillez définir les positions d'entrée et de sortie de la maison");
            return;
        }
        const payload = {
            nom,
            prix: Number(prix),
            categorie,
            modele: currentModel,
            positionEntree,
            positionSortie,
            garage: null,
        };
        console.log(payload);
        alert("Maison créée !");
    } else if (garageEnabled) {
        if (!garageEntree || !garageSortie) {
            alert("Veuillez définir les positions d'entrée et de sortie du garage");        
            return;
        }
        const payload = {
            nom,
            prix: Number(prix),
            garage: currentGarage,
            positionEntree: garageEntree,
            positionSortie: garageSortie,
        };
        console.log(payload);
        alert("Garage créé !");
    } else {
        alert("Veuillez activer au moins une option (propriété ou garage)");   
        return;    
    }                
  };

  return (
    <div className="tablet-container">
      <div>
        <p className="tablet-title">Création de Propriété</p>
        <p className="tablet-subtext">Créez une propriété où vous le souhaitez avec ou sans garage</p>
      </div>

      <div className="section">
        <div className="input-parent">
          <Home size={16} className="input-name" />
          <input style={{ paddingLeft: 36 }} placeholder="Nom de la propriété ou garage" value={nom} onChange={(e) => setNom(e.target.value)} />
        </div>
        <div className="input-parent-price">
          <BadgeDollarSign size={16} className="input-price" />
          <input
            type="number"
            style={{ paddingLeft: 36, appearance: "textfield" }}
            placeholder="Prix de la priopriété ou garage"
            min="0"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="switch-block">
            <div>
              <span>Ajouter une propriété</span>
              <br />
              <small>Cette option ne peut pas être modifiée ultérieurement</small>
            </div>
            <div className={`switch-toggle ${HouseEnabled ? "active" : ""}`} onClick={() => setHouseEnabled((v) => !v)} />
        </div>
        {HouseEnabled && (
          <div style={{ position: "relative" }}>
                <Layers size={16} style={{ position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)", color: "#888" }} />
                <select value={categorie} onChange={(e) => setCategorie(e.target.value)} style={{ paddingLeft: 36 }}>
                  {Object.keys(propertyModels).map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
          </div>
        )}
      </div>

       {HouseEnabled && (
               <div className="property-preview">
                 <div className="property-controls">
                   <span onClick={precedentModele} style={{ cursor: "pointer" }}><ChevronLeft size={18} /></span>
                   <span onClick={suivantModele} style={{ cursor: "pointer" }}><ChevronRight size={18} /></span>
                 </div>
                 <img
                   src={currentModel.img}
                   alt={currentModel.name}
                   onClick={() => setModelSelected(true)}
                   style={{ cursor: "pointer" }}
                   title="Cliquer pour sélectionner ce modèle"
                 />
                 <span className="property-name">{currentModel.name}</span>
               </div>
           )}

      {HouseEnabled && modelSelected && (
        <div className="button-row fade-in">
          <button onClick={() => enregistrerPosition("entree")}><div style={{ display: "flex", alignItems: "center" }}><MapPin size={14} style={{ marginRight: 8 }} /> Position entrée</div></button>
          <button onClick={() => enregistrerPosition("sortie")}><div style={{ display: "flex", alignItems: "center" }}><MapPin size={14} style={{ marginRight: 8 }} /> Position sortie</div></button>
        </div>
      )}


      <div className="switch-block">
        <div>
          <span>Ajouter un garage</span>
          <br />
          <small>Cette option ne peut pas être modifiée ultérieurement</small>
        </div>
        <div className={`switch-toggle ${garageEnabled ? "active" : ""}`} onClick={() => setGarageEnabled((v) => !v)} />
      </div>

      {garageEnabled && (
        <>
          <div className="property-preview">
            <div className="property-controls">
              <span onClick={precedentGarage} style={{ cursor: "pointer" }}><ChevronLeft size={18} /></span>
              <span onClick={suivantGarage} style={{ cursor: "pointer" }}><ChevronRight size={18} /></span>
            </div>
            <img
              src={currentGarage.img}
              alt={currentGarage.size}
              onClick={() => setGarageSelected(true)}
              style={{ cursor: "pointer" }}
              title="Cliquer pour sélectionner ce garage"
            />
            <span className="property-name">{currentGarage.size}</span>
          </div>

          {garageSelected && (
            <div className="button-row fade-in">
              <button onClick={() => enregistrerPosition("garage_entree")}><div style={{ display: "flex", alignItems: "center" }}><MapPin size={14} style={{ marginRight: 8 }} /> Position entrée garage</div></button>
              <button onClick={() => enregistrerPosition("garage_sortie")}><div style={{ display: "flex", alignItems: "center" }}><MapPin size={14} style={{ marginRight: 8 }} /> Position sortie garage</div></button>
            </div>
          )}
        </>
      )}
      
        <button className="button-primary" onClick={handleSubmit}><Check size={16} style={{ marginRight: 6 }} /> Confirmer</button>
 
    </div>
  );
}

