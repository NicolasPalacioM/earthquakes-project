"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EARTHQUAKE } from "../../graphql/mutations";
import { GET_EARTHQUAKES } from "../../graphql/queries";
import { useRouter } from "next/navigation";
import { GetEarthquakesData } from "@/types/graphql";

const AddEarthquakeForm: React.FC = () => {
  const [location, setLocation] = useState("");
  const [magnitude, setMagnitude] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  const [locationError, setLocationError] = useState("");
  const [magnitudeError, setMagnitudeError] = useState("");
  const [dateError, setDateError] = useState("");

  const [addEarthquake, { loading, error }] = useMutation(ADD_EARTHQUAKE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLocationError("");
    setMagnitudeError("");
    setDateError("");

    let valid = true;

    // Location validation
    const locationPattern = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;
    if (location.trim() === "") {
      setLocationError("Location is required.");
      valid = false;
    } else if (!locationPattern.test(location.trim())) {
      setLocationError(
        "Location must be in 'latitude, longitude' format with valid numbers."
      );
      valid = false;
    } else {
      const [latStr, lonStr] = location.split(",").map((s) => s.trim());
      const latitude = parseFloat(latStr);
      const longitude = parseFloat(lonStr);

      if (
        isNaN(latitude) ||
        latitude < -90 ||
        latitude > 90 ||
        isNaN(longitude) ||
        longitude < -180 ||
        longitude > 180
      ) {
        setLocationError(
          "Latitude must be between -90 and 90, and longitude between -180 and 180."
        );
        valid = false;
      }
    }

    // Magnitude validation
    const magnitudeValue = parseFloat(magnitude);
    if (isNaN(magnitudeValue)) {
      setMagnitudeError("Magnitude must be a number.");
      valid = false;
    } else if (magnitudeValue < 0 || magnitudeValue > 10) {
      setMagnitudeError("Magnitude must be between 0 and 10.");
      valid = false;
    }

    // Date validation
    const dateValue = new Date(date);
    const now = new Date();
    if (isNaN(dateValue.getTime())) {
      setDateError("Date is invalid.");
      valid = false;
    } else if (dateValue > now) {
      setDateError("Date cannot be in the future.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    // Proceed with the mutation and update the cache manually
    try {
      await addEarthquake({
        variables: {
          location,
          magnitude: magnitudeValue,
          date,
        },
        update: (cache, { data: { addEarthquake } }) => {
          // Read the existing data from the cache
          const existingData = cache.readQuery<GetEarthquakesData>({
            query: GET_EARTHQUAKES,
            variables: { limit: 10, offset: 0 },
          });

          // If the cache is empty, initialize it
          if (!existingData) {
            cache.writeQuery({
              query: GET_EARTHQUAKES,
              variables: { limit: 10, offset: 0 },
              data: {
                earthquakes: {
                  totalCount: 1,
                  earthquakes: [addEarthquake],
                },
              },
            });
          } else {
            // Update the cache by adding the new earthquake
            cache.writeQuery({
              query: GET_EARTHQUAKES,
              variables: { limit: 10, offset: 0 },
              data: {
                earthquakes: {
                  ...existingData.earthquakes,
                  totalCount: existingData.earthquakes.totalCount + 1,
                  earthquakes: [
                    addEarthquake,
                    ...existingData.earthquakes.earthquakes,
                  ],
                },
              },
            });
          }
        },
      });

      router.push("/");
    } catch (err) {
      console.error("Error adding earthquake:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Earthquake</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">
            Location (latitude, longitude)
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="e.g., -11.1040, 165.5320"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {locationError && (
            <p className="text-red-500 mt-1">{locationError}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Magnitude</label>
          <input
            type="number"
            value={magnitude}
            onChange={(e) => setMagnitude(e.target.value)}
            required
            step="any"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {magnitudeError && (
            <p className="text-red-500 mt-1">{magnitudeError}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {dateError && <p className="text-red-500 mt-1">{dateError}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Earthquake"}
        </button>
        {error && <p className="text-red-500 mt-2">Error adding earthquake.</p>}
      </form>
    </div>
  );
};

export default AddEarthquakeForm;
