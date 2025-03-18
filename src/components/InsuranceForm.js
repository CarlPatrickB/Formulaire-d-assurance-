import React, { useState } from "react";
const FormulaireAssurance = () => {
  // États pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    // Section 1: Identification
    callReason: "",
    agentName: "",
    // Section 2: Résumé
    requestSummary: "",
    // Section 3: Type de transaction
    mainCategory: "",
    autoOperations: [],
    homeOperations: [],
    // Autres sections (version simplifiée)
    autoRiskFactors: [],
    homeRiskFactors: [],
    autoProtections: [],
    homeProtections: [],
    autoRejected: [],
    homeRejected: [],
    // Sections 6-9
    notableElements: "",
    recommendations: "",
    limitations: [],
    missingInfo: [],
    actions: [],
    followUpDate: "",
  });
  // État pour la note générée
  const [generatedNote, setGeneratedNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  // Options simplifiées
  const options = {
    callReasons: [
      "Nouvelle soumission",
      "Modification de police",
      "Renouvellement",
      "Ajout/retrait de véhicule",
      "Ajout/retrait de conducteur",
      "Changement d'adresse",
      "Modification de couverture",
      "Réclamation",
      "Question générale",
      "Autre",
    ],
    categories: ["Automobile", "Habitation", "Entreprise", "Autre"],
    autoOperations: [
      "Nouvelle soumission",
      "Ajout de véhicule",
      "Retrait de véhicule",
      "Modification de véhicule",
      "Ajout de conducteur",
      "Retrait de conducteur",
      "Modification d'usage",
      "Modification de garanties",
      "Renouvellement",
    ],
    homeOperations: [
      "Nouvelle soumission",
      "Modification de résidence",
      "Modification de garanties",
      "Ajout de biens spécifiques",
      "Retrait de biens spécifiques",
      "Renouvellement",
    ],
    autoRiskFactors: [
      "Aucune aggravation identifiée",
      "Conducteur novice",
      "Conducteur avec suspension/révocation",
      "Sinistres multiples",
      "Infractions graves",
      "Usage commercial non déclaré",
      "Modifications non standards",
      "Véhicule haute performance",
      "Zone à haut risque de vol",
      "Autre",
    ],
    homeRiskFactors: [
      "Aucune aggravation identifiée",
      "Résidence secondaire/saisonnière",
      "Bâtiment vacant",
      "Activité commerciale à domicile",
      "Piscine sans clôture",
      "Foyer au bois non certifié",
      "Zone inondable",
      "Toiture âgée",
      "Système électrique désuet",
      "Système de plomberie à risque",
      "Animaux à risque",
      "Autre",
    ],
    autoProtections: [
      "Responsabilité civile",
      "Collision et versement",
      "Tous risques sauf collision",
      "FAA43 (Véhicule de remplacement)",
      "FAA20 (Valeur à neuf)",
      "Autres",
    ],
    homeProtections: [
      "Formule tous risques",
      "Formule risques désignés",
      "Dégâts d'eau",
      "Inondation",
      "Tremblement de terre",
      "Valeur à neuf",
      "Responsabilité civile",
      "Autres",
    ],
    limitations: [
      "Exclusions standard",
      "Limitations de la garantie vol",
      "Limitations - catastrophes naturelles",
      "Limitations - dommages préexistants",
      "Limitations - biens de valeur",
      "Limitations - activités commerciales",
    ],
    missingInfo: [
      "Aucune information manquante",
      "Permis de conduire",
      "Historique de conduite",
      "Preuves d'absence de sinistres",
      "Photos du bien",
      "Factures d'achat",
    ],
    actions: [
      "Rappeler le client",
      "Envoyer documents par courriel",
      "Envoyer documents par courrier",
      "Attendre rappel du client",
      "Contacter assureur précédent",
      "Aucun suivi requis",
    ],
  };
  // Gestion des champs texte et select
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Gestion des cases à cocher
  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [category]: [...formData[category], value],
      });
    } else {
      setFormData({
        ...formData,
        [category]: formData[category].filter((item) => item !== value),
      });
    }
  };
  // Générer la note standardisée
  const generateNote = () => {
    const currentDate = new Date().toLocaleDateString("fr-FR");
    let note = `NOTES D'INTERACTION - ${currentDate}\n\n`;
    // Section 1
    note += `1. IDENTIFICATION DE L'INTERACTION\n`;
    note += ` Raison de l'appel: ${formData.callReason}\n`;
    note += ` Nom de l'intervenant: ${formData.agentName}\n\n`;
    // Section 2
    note += `2. RÉSUMÉ DE LA REQUÊTE\n`;
    note += ` ${formData.requestSummary}\n\n`;
    // Section 3
    note += `3. TYPE DE TRANSACTION\n`;
    note += ` Catégorie principale: ${formData.mainCategory}\n`;
    if (formData.mainCategory === "Automobile") {
      note += ` 3.1 TRANSACTION AUTOMOBILE\n`;
      note += ` Type d'opération: ${formData.autoOperations.join(", ")}\n\n`;
      // Section 4.1 (Automobile)
      note += `4. AGGRAVATIONS DE RISQUES\n`;
      note += ` 4.1 RISQUES AUTOMOBILE\n`;
      note += ` Facteurs: ${formData.autoRiskFactors.join(", ")}\n\n`;
      // Section 5.1 (Automobile)
      note += `5. PROTECTIONS ET GARANTIES\n`;
      note += ` 5.1 PROTECTIONS AUTOMOBILE\n`;
      note += ` Protections offertes: ${formData.autoProtections.join(", ")}\n`;
      note += ` Garanties refusées: ${formData.autoRejected.join(", ")}\n\n`;
    } else if (formData.mainCategory === "Habitation") {
      note += ` 3.2 TRANSACTION HABITATION\n`;
      note += ` Type d'opération: ${formData.homeOperations.join(", ")}\n\n`;
      // Section 4.2 (Habitation)
      note += `4. AGGRAVATIONS DE RISQUES\n`;
      note += ` 4.2 RISQUES HABITATION\n`;
      note += ` Facteurs: ${formData.homeRiskFactors.join(", ")}\n\n`;
      // Section 5.2 (Habitation)
      note += `5. PROTECTIONS ET GARANTIES\n`;
      note += ` 5.2 PROTECTIONS HABITATION\n`;
      note += ` Protections offertes: ${formData.homeProtections.join(", ")}\n`;
      note += ` Garanties refusées: ${formData.homeRejected.join(", ")}\n\n`;
    }
    // Section 6
    note += `6. PARTICULARITÉS PERTINENTES\n`;
    note += ` Éléments notables: ${formData.notableElements}\n\n`;
    // Section 7
    note += `7. RECOMMANDATIONS ET LIMITATIONS\n`;
    note += ` Recommandations: ${formData.recommendations}\n`;
    note += ` Limitations explicitées: ${formData.limitations.join(", ")}\n\n`;
    // Section 8
    note += `8. INFORMATIONS MANQUANTES\n`;
    note += ` Documents en attente: ${formData.missingInfo.join(", ")}\n\n`;
    // Section 9
    note += `9. SUIVI\n`;
    note += ` Actions requises: ${formData.actions.join(", ")}\n`;
    note += ` Date de suivi prévue: ${formData.followUpDate}\n`;
    setGeneratedNote(note);
    setShowNote(true);
  };
  // Copier la note dans le presse-papiers
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedNote)
      .then(() => alert("Note copiée dans le presse-papiers!"))
      .catch((err) => console.error("Erreur lors de la copie:", err));
  };
  // Revenir au formulaire
  const backToForm = () => {
    setShowNote(false);
  };
  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      callReason: "",
      agentName: "",
      requestSummary: "",
      mainCategory: "",
      autoOperations: [],
      homeOperations: [],
      autoRiskFactors: [],
      homeRiskFactors: [],
      autoProtections: [],
      homeProtections: [],
      autoRejected: [],
      homeRejected: [],
      notableElements: "",
      recommendations: "",
      limitations: [],
      missingInfo: [],
      actions: [],
      followUpDate: "",
    });
    setGeneratedNote("");
    setShowNote(false);
  };
  // Composant pour les groupes de cases à cocher
  const CheckboxGroup = ({ options, category, values, onChange }) => (
    <div className="grid grid-cols-2 gap-1 mt-1">
      {options.map((option) => (
        <div key={option} className="flex items-start">
          <input
            type="checkbox"
            id={`${category}-${option}`}
            value={option}
            checked={values.includes(option)}
            onChange={(e) => onChange(e, category)}
            className="mt-1 mr-2"
          />
          <label htmlFor={`${category}-${option}`} className="text-sm">
            {option}
          </label>
        </div>
      ))}
    </div>
  );
  return (
    <div className="max-w-6xl mx-auto bg-gray-50">
      <div className="p-4 bg-blue-700 text-white">
        <h1 className="text-xl font-bold text-center">
          Générateur de Notes Standardisées - Assurance de Dommages
        </h1>
      </div>
      {!showNote ? (
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            {/* Section 1: Identification */}
            <h2 className="text-lg font-semibold text-blue-700 mb-3 border-b pb-2">
              1. Identification de l'interaction
            </h2>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Raison de l'appel:
              </label>
              <select
                name="callReason"
                value={formData.callReason}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Sélectionner...</option>
                {options.callReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Nom de l'intervenant:
              </label>
              <input
                type="text"
                name="agentName"
                value={formData.agentName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            {/* Section 2: Résumé */}
            <h2 className="text-lg font-semibold text-blue-700 mb-3 border-b pb-2 mt-4">
              2. Résumé de la requête
            </h2>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Description sommaire:
              </label>
              <textarea
                name="requestSummary"
                value={formData.requestSummary}
                onChange={handleInputChange}
                rows="2"
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            {/* Section 3: Type de transaction */}
            <h2 className="text-lg font-semibold text-blue-700 mb-3 border-b pb-2 mt-4">
              3. Type de transaction
            </h2>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Catégorie principale:
              </label>
              <select
                name="mainCategory"
                value={formData.mainCategory}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Sélectionner...</option>
                {options.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {/* Sections conditionnelles selon catégorie */}
            {formData.mainCategory === "Automobile" && (
              <>
                <div className="ml-4 pl-2 border-l-2 border-blue-200 mb-3">
                  <h3 className="font-medium mb-1">
                    3.1 Transaction automobile
                  </h3>
                  <label className="block text-sm font-medium mb-1">
                    Type d'opération:
                  </label>
                  <CheckboxGroup
                    options={options.autoOperations}
                    category="autoOperations"
                    values={formData.autoOperations}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <h2 className="text-lg font-semibold text-blue-700 mb-3 border-b pb-2 mt-4">
                  4. Aggravations de risques
                </h2>
                <div className="mb-3">
                  <h3 className="font-medium mb-1">4.1 Risques automobile</h3>
                  <CheckboxGroup
                    options={options.autoRiskFactors}
                    category="autoRiskFactors"
                    values={formData.autoRiskFactors}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <h2 className="text-lg font-semibold text-blue-700 mb-3 border-b pb-2 mt-4">
                  5. Protections et garanties
                </h2>
                <div className="mb-3">
                  <h3 className="font-medium mb-1">
                    5.1 Protections automobile
                  </h3>
                  <label className="block text-sm font-medium mb-1">
                    Protections offertes:
                  </label>
                  <CheckboxGroup
                    options={options.autoProtections}
                    category="autoProtections"
                    values={formData.autoProtections}
                    onChange={handleCheckboxChange}
                  />
                  <label className="block text-sm font-medium mb-1 mt-2">
                    Garanties refusées:
                  </label>
                  <CheckboxGroup
                    options={options.autoProtections}
                    category="autoRejected"
                    values={formData.autoRejected}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </>
            )}
            {formData.mainCategory === "Habitation" && (
              <>
                <div className="ml-4 pl-2 border-l-2 border-blue-200 mb-3">
                  <h3 className="font-medium mb-1">
                    3.2 Transaction habitation
                  </h3>
                  <label className="block text-sm font-medium mb-1">
                    Type d'opération:
                  </label>
                  <CheckboxGroup
                    options={options.homeOperations}
                    category="homeOperations"
                    values={formData.homeOperations}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <h2 className="text-lg font-semibold text-blue-700 mb-3 border-b pb-2 mt-4">
                  4. Aggravations de risques
                </h2>
                <div className="mb-3">
                  <h3 className="font-medium mb-1">4.2 Risques habitation</h3>
                  <CheckboxGroup
                    options={options.homeRiskFactors}
                    category="homeRiskFactors"
                    values={formData.homeRiskFactors}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <h2 className="text-lg font-semibold text-blue-700 mb-3 border-b pb-2 mt-4">
                  5. Protections et garanties
                </h2>
                <div className="mb-3">
                  <h3 className="font-medium mb-1">
                    5.2 Protections habitation
                  </h3>
                  <label className="block text-sm font-medium mb-1">
                    Protections offertes:
                  </label>
                  <CheckboxGroup
                    options={options.homeProtections}
                    category="homeProtections"
                    values={formData.homeProtections}
                    onChange={handleCheckboxChange}
                  />
                  <label className="block text-sm font-medium mb-1 mt-2">
                    Garanties refusées:
                  </label>
                  <CheckboxGroup
                    options={options.homeProtections}
                    category="homeRejected"
                    values={formData.homeRejected}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </>
            )}
            {/* Sections communes */}
            <h2 className="text-lg font-semibold text-blue-700 mb-3 border-b pb-2 mt-4">
              6. Particularités pertinentes
            </h2>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Éléments notables:
              </label>
              <textarea
                name="notableElements"
                value={formData.notableElements}
                onChange={handleInputChange}
                rows="2"
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            <h2 className="text-lg font-semibold text-blue-700 mb-3 border-b pb-2 mt-4">
              7. Recommandations et limitations
            </h2>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Recommandations:
              </label>
              <textarea
                name="recommendations"
                value={formData.recommendations}
                onChange={handleInputChange}
                rows="2"
                className="w-full p-2 border rounded"
              ></textarea>
              <label className="block text-sm font-medium mb-1 mt-2">
                Limitations explicitées:
              </label>
              <CheckboxGroup
                options={options.limitations}
                category="limitations"
                values={formData.limitations}
                onChange={handleCheckboxChange}
              />
            </div>
            <h2 className="text-lg font-semibold text-blue-700 mb-3 border-b pb-2 mt-4">
              8. Informations manquantes
            </h2>
            <div className="mb-3">
              <CheckboxGroup
                options={options.missingInfo}
                category="missingInfo"
                values={formData.missingInfo}
                onChange={handleCheckboxChange}
              />
            </div>
            <h2 className="text-lg font-semibold text-blue-700 mb-3 border-b pb-2 mt-4">
              9. Suivi
            </h2>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Actions requises:
              </label>
              <CheckboxGroup
                options={options.actions}
                category="actions"
                values={formData.actions}
                onChange={handleCheckboxChange}
              />
              <label className="block text-sm font-medium mb-1 mt-2">
                Date de suivi prévue:
              </label>
              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={generateNote}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Générer la note
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-blue-700 mb-3">
              Note générée
            </h2>
            <div
              className="bg-gray-50 p-4 rounded border mb-4 whitespace-pre-wrap
font-mono"
            >
              {generatedNote}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={copyToClipboard}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Copier
              </button>
              <button
                onClick={backToForm}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Retour au formulaire
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Nouveau formulaire
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FormulaireAssurance;
