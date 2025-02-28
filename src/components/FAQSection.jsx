import React from "react";
import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

export default function FAQSection() {
  const faqs = [
    {
      question:
        "Quelle est la démarche pour publier une annonce sur la plateforme ?",
      answer:
        "Il vous suffit de cliquer sur 'Publier une annonce', de remplir le formulaire détaillé et de soumettre votre offre. Notre interface intuitive vous guide à chaque étape.",
    },
    {
      question:
        "Comment la plateforme centralise-t-elle les offres de cession et de reprise de bail ?",
      answer:
        "Toutes les annonces sont regroupées sur un espace dédié, ce qui vous permet de bénéficier d'une recherche optimisée et de ne plus perdre de temps sur des publications éparses.",
    },
    {
      question:
        "Quels moyens de communication sont disponibles pour entrer en contact ?",
      answer:
        "Vous pouvez directement joindre les annonceurs via leur moyen de contact indiqué (mobile, email, facebook) De plus, un chat intégré est en cours de développement pour faciliter encore plus vos échanges.",
    },
  ];

  return (
    <section className="py-16 bg-blue-deep">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Questions fréquentes
        </motion.h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <div className="flex items-center mb-4">
                <FaQuestionCircle className="text-2xl text-blue-deep mr-2" />
                <h3 className="text-xl font-semibold text-blue-deep">
                  {faq.question}
                </h3>
              </div>
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
