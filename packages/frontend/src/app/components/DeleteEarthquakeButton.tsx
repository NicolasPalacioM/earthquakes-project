"use client";

import React from "react";
import { useMutation, Reference } from "@apollo/client";
import { DELETE_EARTHQUAKE } from "../../graphql/mutations";

interface Props {
  id: string;
}

const DeleteEarthquakeButton: React.FC<Props> = ({ id }) => {
  const [deleteEarthquake, { loading, error }] = useMutation(
    DELETE_EARTHQUAKE,
    {
      variables: { id },
      update: (cache) => {
        cache.modify({
          fields: {
            earthquakes(existingData = {}, { readField }) {
              // Extract the existing earthquakes array
              const existingEarthquakeRefs = existingData.earthquakes || [];

              // Filter out the deleted earthquake
              const newEarthquakeRefs = existingEarthquakeRefs.filter(
                (quakeRef: Reference) => {
                  return readField("id", quakeRef) !== id;
                }
              );

              // Return the new data with the updated earthquakes array and adjusted totalCount
              return {
                ...existingData,
                earthquakes: newEarthquakeRefs,
                totalCount: existingData.totalCount - 1,
              };
            },
          },
        });
      },
    }
  );

  const handleDelete = async () => {
    try {
      await deleteEarthquake();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-red-500 mt-2">Error deleting earthquake.</p>}
    </>
  );
};

export default DeleteEarthquakeButton;
