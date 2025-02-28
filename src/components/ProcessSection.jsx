import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaSearch, FaComments, FaRegSmile } from "react-icons/fa";

export default function ProcessSection() {
  const steps = [
    {
      icon: <FaEdit className="text-4xl text-blue-deep" />,
      title: "Déposez votre annonce",
      description:
        "Grâce à notre interface intuitive, créez et publiez votre annonce de cession de bail en quelques minutes. Un formulaire simplifié pour saisir toutes les informations essentielles et capter l'attention de vos futurs partenaires.",
    },
    {
      icon: <FaSearch className="text-4xl text-blue-deep" />,
      title: "Trouvez votre opportunité",
      description:
        "Toutes les annonces sont centralisées sur une plateforme dédiée. Utilisez nos outils de recherche avancée pour filtrer et repérer rapidement l'offre qui correspond parfaitement à vos attentes.",
    },
    {
      icon: <FaComments className="text-4xl text-blue-deep" />,
      title: "Connectez-vous instantanément",
      description:
        "Une fois l'annonce identifiée, contactez directement l'annonceur via le moyen partagé (téléphone, email, facebook). Échangez pour discuter des détails.",
    },
    {
      icon: <FaRegSmile className="text-4xl text-blue-deep" />,
      title: "Profitez d'une communication fluide",
      description:
        "Notre interface épurée garantit que les annonces ne se perdent plus dans le flot des publications. Bientôt, un chat intégré viendra rendre vos échanges encore plus directs et sécurisés.",
    },
  ];

  return (
    <section className="py-16 bg-grey-light">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-blue-deep mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Comment ça marche ?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-deep">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
