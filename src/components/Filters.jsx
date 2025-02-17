"use client";
import React, { useState } from "react";

export default function Filters({ onFilterChange }) {
  const [localisation, setLocalisation] = useState("");
  const [minLoyer, setMinLoyer] = useState("");
  const [maxLoyer, setMaxLoyer] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoie les valeurs de filtre au parent
    onFilterChange({ localisation, minLoyer, maxLoyer, startDate, endDate });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 bg-gray-50 rounded shadow"
    >
      <div className="mb-4">
        <label className="block text-gray-700">Localisation</label>
        <input
          type="text"
          value={localisation}
          onChange={(e) => setLocalisation(e.target.value)}
          placeholder="Ville ou quartier"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label className="block text-gray-700">Loyer minimum</label>
          <input
            type="number"
            value={minLoyer}
            onChange={(e) => setMinLoyer(e.target.value)}
            placeholder="Min"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700">Loyer maximum</label>
          <input
            type="number"
            value={maxLoyer}
            onChange={(e) => setMaxLoyer(e.target.value)}
            placeholder="Max"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label className="block text-gray-700">Date de début</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700">Date de fin</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Appliquer les filtres
      </button>
    </form>
  );
}
