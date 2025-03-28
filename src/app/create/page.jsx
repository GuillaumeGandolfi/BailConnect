"use client";
import React from "react";
import AdCreationForm from "../../components/AdCreationForm";
import Link from "next/link";
import { motion } from "framer-motion";
import ProtectedPage from "../../guards/ProtectedPage";

export default function CreateAdPage() {
  return (
    <ProtectedPage>
      <div className="p-4 max-w-xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-blue-deep mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Publiez votre annonce
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Partagez en quelques clics les détails de votre cession de bail et
          mettez-vous en relation avec des partenaires de confiance.
        </motion.p>
        <AdCreationForm onSuccess={() => {}} />
        <div className="mt-4 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            Retour à la page d'accueil
          </Link>
        </div>
      </div>
    </ProtectedPage>
  );
}
