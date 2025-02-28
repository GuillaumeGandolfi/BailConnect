"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { supabase } from "../lib/supabaseClient";

// Schéma de validation avec Yup
const schema = Yup.object().shape({
  titre: Yup.string()
    .max(100, "Le titre ne peut dépasser 100 caractères")
    .required("Veuillez renseigner un titre"),
  description: Yup.string().required("La description est obligatoire"),
  date_de_liberation: Yup.date().required("La date de libération est requise"),
  loyer: Yup.number()
    .positive("Le loyer doit être positif")
    .required("Veuillez renseigner le montant du loyer"),
  localisation: Yup.string()
    .max(100, "La localisation ne peut dépasser 100 caractères")
    .required("La localisation est requise"),
  contact: Yup.string()
    .max(100, "Les coordonnées ne peuvent dépasser 100 caractères")
    .required("Les coordonnées sont obligatoires"),
});

export default function AdCreationForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { error } = await supabase.from("annonces").insert(data);
    if (error) {
      console.error("Erreur lors de l'insertion:", error);
    } else {
      console.log("Annonce insérée avec succès !");
      reset();
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Titre de l'annonce</label>
        <input
          type="text"
          {...register("titre")}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex : Cession de bail Montréal - Quartier le plateau"
        />
        {errors.titre && (
          <p className="text-red-500 text-sm mt-1">{errors.titre.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">
          Description détaillée
        </label>
        <textarea
          {...register("description")}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Décrivez votre situation et les atouts de votre offre..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Date de libération</label>
        <input
          type="date"
          {...register("date_de_liberation")}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.date_de_liberation && (
          <p className="text-red-500 text-sm mt-1">
            {errors.date_de_liberation.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Loyer mensuel</label>
        <input
          type="number"
          {...register("loyer")}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex : 1200"
        />
        {errors.loyer && (
          <p className="text-red-500 text-sm mt-1">{errors.loyer.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Localisation</label>
        <input
          type="text"
          {...register("localisation")}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex : H1W 0A1 - Montréal"
        />
        {errors.localisation && (
          <p className="text-red-500 text-sm mt-1">
            {errors.localisation.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1">
          Coordonnées de contact
        </label>
        <input
          type="text"
          {...register("contact")}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email, téléphone, etc."
        />
        {errors.contact && (
          <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        {isSubmitting ? "Envoi en cours..." : "Valider et publier l'annonce"}
      </button>
    </form>
  );
}
