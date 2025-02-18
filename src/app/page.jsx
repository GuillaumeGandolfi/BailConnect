"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AdCard from "../components/AdCard";
import Filters from "../components/Filters";
import Link from "next/link";

export default function HomePage() {
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
      // Appel de la fonction RPC (pour la recherche dans accent par exemple)
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

    // Application des filtres avancés côté client
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Annonces</h1>
        <Link
          href="/create"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Créer une annonce
        </Link>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bouton pour afficher/masquer les filtres avancés */}
      <div className="mb-6">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="text-blue-500 hover:underline"
        >
          {showAdvancedFilters
            ? "Masquer les filtres avancés"
            : "Afficher les filtres avancés"}
        </button>
        {showAdvancedFilters && (
          <div className="mt-4">
            <Filters onFilterChange={(newFilters) => setFilters(newFilters)} />
          </div>
        )}
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>Erreur : {error.message}</p>
      ) : ads.length === 0 ? (
        <p>Aucune annonce trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </div>
  );
}
