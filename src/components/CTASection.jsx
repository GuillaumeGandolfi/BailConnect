import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-16 bg-grey-light">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold text-blue-deep mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Vous souhaitez céder votre bail ou trouver votre prochain logement ?
        </motion.h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link
              href="/create"
              className="bg-orange-coral text-white py-3 px-8 rounded hover:bg-orange-600 transition"
            >
              Publier une annonce
            </Link>
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link
              href="/ads"
              className="bg-blue-deep text-white py-3 px-8 rounded hover:bg-blue-600 transition"
            >
              Voir les annonces
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
