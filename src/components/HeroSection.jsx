import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-grey-light py-20 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-blue-deep"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
      />

      <div className="relative container mx-auto px-4 text-center">
        <motion.h1
          className="text-6xl font-bold text-white mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Cession et reprise de bail, simplifiées pour vous
        </motion.h1>
        <motion.p
          className="text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Marre de perdre du temps à chercher parmi des annonces dispersées ?
          Notre plateforme centralise toutes les offres et vous connecte en un
          clin d'œil avec des partenaires de confiance. Profitez d'une solution
          claire, rapide et sécurisée pour une cession ou reprise de bail
          réussie.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link
            href="/create"
            className="bg-orange-coral text-white py-3 px-8 rounded hover:bg-orange-600 transition"
          >
            Publier une annonce
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
