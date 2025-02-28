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
          className="text-5xl font-bold text-white mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Simplifiez votre cession et reprise de bail
        </motion.h1>
        <motion.p
          className="text-xl text-white mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Trouvez rapidement des partenaires fiables et facilitez vos démarches
          immobilières. Que vous souhaitiez céder ou reprendre un bail, notre
          plateforme vous offre une solution simple et efficace pour concrétiser
          vos projets.
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
