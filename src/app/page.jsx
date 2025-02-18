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

  useEffect(() => {
    fetchAds();
  }, [filters]);

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

      <Filters onFilterChange={(newFilters) => setFilters(newFilters)} />

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
