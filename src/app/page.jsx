"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AdCard from "../components/AdCard";
import AdCreationForm from "../components/AdCreationForm";
import Filters from "../components/Filters";

export default function HomePage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  // Récupération des annonces en appliquant les filtres
  const fetchAds = async () => {
    setLoading(true);
    let query = supabase.from("annonces").select("*");

    if (filters.localisation) {
      query = query.ilike("localisation", `%${filters.localisation}%`);
    }
    if (filters.minLoyer) {
      query = query.gte("loyer", parseFloat(filters.minLoyer));
    }
    if (filters.maxLoyer) {
      query = query.lte("loyer", parseFloat(filters.maxLoyer));
    }
    if (filters.startDate) {
      query = query.gte("date_de_liberation", filters.startDate);
    }
    if (filters.endDate) {
      query = query.lte("date_de_liberation", filters.endDate);
    }

    const { data, error } = await query;
    if (error) {
      setError(error);
    } else {
      setAds(data);
    }
    setLoading(false);
  };

  // Rafraîchit la liste dès que les filtres changent
  useEffect(() => {
    fetchAds();
  }, [filters]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Créer une annonce</h1>
      <AdCreationForm onSuccess={fetchAds} />

      <h2 className="text-2xl font-bold mt-8 mb-4">Filtres</h2>
      <Filters onFilterChange={(newFilters) => setFilters(newFilters)} />

      <h2 className="text-2xl font-bold mt-8 mb-4">Liste des annonces</h2>
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
