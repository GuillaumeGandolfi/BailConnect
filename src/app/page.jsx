"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function HomePage() {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    async function fetchAnnonces() {
      const { data, error } = await supabase.from("annonces").select("*");
      if (error) {
        console.error("Erreur de récupération:", error);
      } else {
        console.log("Données récupérées:", data);
        setAnnonces(data);
      }
    }
    fetchAnnonces();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Hello, BailConnect!</h1>
      <ul>
        {annonces.length > 0 ? (
          annonces.map((annonce) => (
            <li key={annonce.id}>
              <h2>{annonce.titre}</h2>
              <p>{annonce.description}</p>
            </li>
          ))
        ) : (
          <p>Aucune annonce trouvée.</p>
        )}
      </ul>
    </div>
  );
}
