"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AdCard from "../components/AdCard";
import AdCreationForm from "../components/AdCreationForm";

export default function HomePage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAds = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("annonces").select("*");
    if (error) {
      setError(error);
    } else {
      setAds(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Créer une annonce</h1>
      {/* On passe fetchAds en prop pour rafraîchir la liste après création */}
      <AdCreationForm onSuccess={fetchAds} />

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
