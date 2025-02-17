"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AdCard from "../components/AdCard";

export default function HomePage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAds() {
      const { data, error } = await supabase.from("annonces").select("*");
      if (error) {
        setError(error);
      } else {
        setAds(data);
      }
      setLoading(false);
    }
    fetchAds();
  }, []);

  return (
    <div className="p-4">
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
