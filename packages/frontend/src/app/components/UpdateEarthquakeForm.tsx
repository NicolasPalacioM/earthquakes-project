"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_EARTHQUAKE } from "../../graphql/mutations";
import { GET_EARTHQUAKE } from "../../graphql/queries";
import { useRouter, useParams } from "next/navigation";

const UpdateEarthquakeForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const {
    loading: queryLoading,
    error: queryError,
    data,
  } = useQuery(GET_EARTHQUAKE, {
    variables: { id },
    skip: !id,
  });

  const [updateEarthquake, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_EARTHQUAKE);

  const [location, setLocation] = useState("");
  const [magnitude, setMagnitude] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (data && data.earthquake) {
      setLocation(data.earthquake.location);
      setMagnitude(data.earthquake.magnitude.toString());
      setDate(new Date(+data.earthquake.date).toISOString().slice(0, -1));
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateEarthquake({
      variables: {
        id,
        location,
        magnitude: parseFloat(magnitude),
        date,
      },
    });

    router.push("/");
  };

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error fetching earthquake.</p>;

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Update Earthquake</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <div>
          <label className="block text-gray-700">Magnitude</label>
          <input
            type="number"
            value={magnitude}
            onChange={(e) => setMagnitude(e.target.value)}
            required
            step="any"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <button
          type="submit"
          disabled={mutationLoading}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          {mutationLoading ? "Updating..." : "Update Earthquake"}
        </button>
        {mutationError && (
          <p className="text-red-500 mt-2">Error updating earthquake.</p>
        )}
      </form>
    </div>
  );
};

export default UpdateEarthquakeForm;
