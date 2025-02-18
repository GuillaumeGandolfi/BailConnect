"use client";
import React from "react";
import AdCreationForm from "../../components/AdCreationForm";
import Link from "next/link";

export default function CreateAdPage() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Créer une annonce</h1>
      <AdCreationForm onSuccess={() => {}} />
      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Retour à la page d'accueil
        </Link>
      </div>
    </div>
  );
}
