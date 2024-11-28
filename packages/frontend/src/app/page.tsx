import React from "react";
import EarthquakeList from "./components/EarthquakeList";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Earthquake Dashboard
      </h1>
      <EarthquakeList />
    </div>
  );
}
