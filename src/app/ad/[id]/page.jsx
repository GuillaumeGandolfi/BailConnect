"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import Link from "next/link";

export default function AdDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAd() {
      setLoading(true);
      const { data, error } = await supabase
        .from("annonces")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        setError(error);
      } else {
        setAd(data);
      }
      setLoading(false);
    }
    if (id) fetchAd();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!ad) return <p>Aucune annonce trouvée.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Retour
      </button>
      <h1 className="text-3xl font-bold mb-4">{ad.titre}</h1>
      <p className="mb-4">{ad.description}</p>
      <div className="mb-2">
        <strong>Date de libération : </strong>
        {new Date(ad.date_de_liberation).toLocaleDateString()}
      </div>
      <div className="mb-2">
        <strong>Loyer : </strong>
        {ad.loyer} $
      </div>
      <div className="mb-2">
        <strong>Localisation : </strong>
        {ad.localisation}
      </div>
      <div className="mb-2">
        <strong>Contact : </strong>
        {ad.contact}
      </div>
      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Retour à la liste
        </Link>
      </div>
    </div>
  );
}
