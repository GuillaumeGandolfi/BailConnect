"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AdCard({ ad }) {
  return (
    <motion.div
      className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800">{ad.titre}</h3>
      </div>
      <p className="text-gray-600 mb-2">{ad.description}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>
          Date de libération:{" "}
          {new Date(ad.date_de_liberation).toLocaleDateString()}
        </span>
        <span>Loyer: {ad.loyer} $</span>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Localisation: {ad.localisation}
      </div>
    </motion.div>
  );
}
