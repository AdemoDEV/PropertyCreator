import React, { useState, useEffect } from "react";
import { MapPin, ChevronLeft, ChevronRight, Check, FolderDot, Home, BadgeDollarSign, Layers, House } from "lucide-react";
import "./creationPropriete.css";
import { notify } from "../utils/Notify";

const propertyModels = {
  "Bas de gamme": [
    { name: "Chambre d'Hotel", img: "/images/hotel.png", desc: "Petite Chambre d'hotel pour les arrivants." },
    { name: "Appartement 1", img: "/images/appart_bas.png", desc: "Appartement une pièce économique." },
  ],
  "Moyen de gamme": [
    { name: "Appartement 1", img: "/images/appart_moyen.png", desc: "Appartement deux pièces bien situé." },
  ],
  Luxe: [
    { name: "Penthouse (Rouge)", img: "/images/pent_rouge.png", desc: "Vue imprenable avec prestations haut de gamme." },
    { name: "Penthouse (Blanc)", img: "/images/pent_blanc.png", desc: "Vue imprenable avec prestations haut de gamme." },
    { name: "Villa", img: "/images/villa_lux.png", desc: "Villa luxueuse." },
  ],
};

const garages = [
  { size: "2 places", img: "/images/garage2.png", desc: "Garage pour 2 véhicules." },
  { size: "4 places", img: "/images/garage4.png", desc: "Garage pour 4 véhicules." },
  { size: "10 places", img: "/images/garage10.png", desc: "Garage spacieux pour collectionneurs." },
];

export default function PropertyCreator() {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [rent, setRent] = useState('');
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
  const pos = { x: 0, y: 0, z: 0 };          // ← récupère tes vraies coords ici
  switch (type) {
    case "entree":        setPositionEntree(pos);   break;
    case "sortie":        setPositionSortie(pos);   break;
    case "garage_entree": setGarageEntree(pos);     break;
    case "garage_sortie": setGarageSortie(pos);     break;
    default: return;
  }
  notify({
    title: "Position enregistrée",
    message: `La position « ${type.replace("_", " ")} » est définie.`,
    timeout: 2500,
    advanced: false,
    dark: true
  });
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
    if (!nom || !prix || !rent) {
      notify({title: "Erreur", message: "Veuillez remplir tous les champs obligatoires.", timeout: 3000, advanced: false, dark: true});
      return;
    }

    if (HouseEnabled && garageEnabled) {
        if (!positionEntree || !positionSortie || !garageEntree || !garageSortie) {
            notify({title: "Erreur", message: "Veuillez définir toutes les positions (entrée, sortie, garage entrée, garage sortie)", timeout: 3000, advanced: false, dark: false});
            return;
        }
        const payload = {
            type: "property_all",
            nom,
            prix: Number(prix),
            rent: Number(rent),
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
    notify({title: "Succès", message: "Propriété et garage créés !", timeout: 3000, advanced: false, dark: false});
    } else if (HouseEnabled) {
        if (!positionEntree || !positionSortie) {
            notify({title: "Erreur", message: "Veuillez définir les positions d'entrée et de sortie de la maison", timeout: 3000, advanced: false, dark: false});
            return;
        }
        const payload = {
            type: "property",
            nom,
            prix: Number(prix),
            rent: Number(rent),
            categorie,
            modele: currentModel,
            positionEntree,
            positionSortie,
            garage: null,
        };
        console.log(payload);
        notify({title: "Succès", message: "Maison créée !", timeout: 3000, advanced: false, dark: false});
    } else if (garageEnabled) {
        if (!garageEntree || !garageSortie) {
            notify({title: "Erreur", message: "Veuillez définir les positions d'entrée et de sortie du garage", timeout: 3000, advanced: false, dark: false});
            return;
        }
        const payload = {
            type: "garage",
            nom,
            prix: Number(prix),
            rent: Number(rent),
            garage: currentGarage,
            positionEntree: garageEntree,
            positionSortie: garageSortie,
        };
        console.log(payload);
        notify({title: "Succès", message: "Garage créé !", timeout: 3000, advanced: false, dark: false});
    } else {
        notify({title: "Erreur", message: "Veuillez activer au moins une option (maison ou garage).", timeout: 3000, advanced: false, dark: false});
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

        <div className="input-parent-price">
          <FolderDot size={16} className="input-price" />
          <input
            type="number"
            style={{ paddingLeft: 36, appearance: "textfield" }}
            placeholder="Prix de la location"
            min="0"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
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
              <button
                className={positionEntree ? "btn-ok" : ""}
                onClick={() => enregistrerPosition("entree")}
              >
                {positionEntree ? (
                  <>
                    <Check size={14} style={{ marginRight: 8 }} /> Entrée définie
                  </>
                ) : (
                  <>
                    <MapPin size={14} style={{ marginRight: 8 }} /> Position entrée
                  </>
                )}
              </button>
              
              <button
                className={positionSortie ? "btn-ok" : ""}
                onClick={() => enregistrerPosition("sortie")}
              >
                {positionSortie ? (
                  <>
                    <Check size={14} style={{ marginRight: 8 }} /> Sortie définie
                  </>
                ) : (
                  <>
                    <MapPin size={14} style={{ marginRight: 8 }} /> Position sortie
                  </>
                )}
              </button>
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
               <button
                 className={garageEntree ? "btn-ok" : ""}
                 onClick={() => enregistrerPosition("garage_entree")}
               >
                 {garageEntree ? (
        <>
          <Check size={14} style={{ marginRight: 8 }} /> Entrée garage défini
        </>
                 ) : (
        <>
          <MapPin size={14} style={{ marginRight: 8 }} /> Entrée garage
        </>
                 )}
               </button>
               
               <button
                 className={garageSortie ? "btn-ok" : ""}
                 onClick={() => enregistrerPosition("garage_sortie")}
               >
                 {garageSortie ? (
                   <>
                     <Check size={14} style={{ marginRight: 8 }} /> Sortie garage défini
                   </>
                 ) : (
                   <>
                     <MapPin size={14} style={{ marginRight: 8 }} /> Sortie garage
                   </>
                 )}
               </button>
            </div>
          )}
        </>
      )}
      
        <button className="button-primary" onClick={handleSubmit}><Check size={16} style={{ marginRight: 6 }} /> Confirmer</button>
 
    </div>
  );
}

