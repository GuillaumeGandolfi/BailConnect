"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import AdCard from "../../components/AdCard";
import Filters from "../../components/Filters";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdsPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const fetchAds = async () => {
    setLoading(true);
    let query;

    if (searchTerm) {
      const { data, error } = await supabase.rpc("search_ads", {
        search_text: searchTerm,
      });
      if (error) {
        setError(error);
        query = [];
      } else {
        query = data;
      }
    } else {
      const { data, error } = await supabase.from("annonces").select("*");
      if (error) {
        setError(error);
        query = [];
      } else {
        query = data;
      }
    }

    if (query) {
      let filteredAds = query;
      if (filters.localisation) {
        filteredAds = filteredAds.filter((ad) =>
          ad.localisation
            .toLowerCase()
            .includes(filters.localisation.toLowerCase())
        );
      }
      if (filters.minLoyer) {
        filteredAds = filteredAds.filter(
          (ad) => parseFloat(ad.loyer) >= parseFloat(filters.minLoyer)
        );
      }
      if (filters.maxLoyer) {
        filteredAds = filteredAds.filter(
          (ad) => parseFloat(ad.loyer) <= parseFloat(filters.maxLoyer)
        );
      }
      if (filters.startDate) {
        filteredAds = filteredAds.filter(
          (ad) => new Date(ad.date_de_liberation) >= new Date(filters.startDate)
        );
      }
      if (filters.endDate) {
        filteredAds = filteredAds.filter(
          (ad) => new Date(ad.date_de_liberation) <= new Date(filters.endDate)
        );
      }
      setAds(filteredAds);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAds();
  }, [filters, searchTerm]);

  return (
    <div className="p-4">
      {/* En-tête de la page */}
      <div className="mb-8 text-center">
        <motion.h1
          className="text-4xl font-bold text-blue-deep"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Découvrez toutes les annonces
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Trouvez l'offre idéale pour votre cession ou reprise de bail.
        </motion.p>
      </div>

      {/* Bouton pour créer une annonce */}
      <div className="mb-6 flex items-center justify-center">
        <Link
          href="/create"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Publier une annonce
        </Link>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher par titre, localisation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bouton pour afficher/masquer les filtres avancés */}
      <div className="mb-6 text-center">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="text-blue-500 hover:underline"
        >
          {showAdvancedFilters
            ? "Masquer les filtres avancés"
            : "Afficher les filtres avancés"}
        </button>
      </div>
      {showAdvancedFilters && (
        <div className="mb-6">
          <Filters onFilterChange={(newFilters) => setFilters(newFilters)} />
        </div>
      )}

      {/* Affichage des annonces */}
      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : error ? (
        <p className="text-center text-red-500">Erreur : {error.message}</p>
      ) : ads.length === 0 ? (
        <p className="text-center">Aucune annonce trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </div>
  );
}
