"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_EARTHQUAKES } from "../../graphql/queries";
import Link from "next/link";
import DeleteEarthquakeButton from "./DeleteEarthquakeButton";
import { Earthquake } from "../../types/Earthquake";
import { motion, AnimatePresence } from "framer-motion";

interface EarthquakeData {
  earthquakes: {
    totalCount: number;
    earthquakes: Earthquake[];
  };
}

const EarthquakeList: React.FC = () => {
  const limit = 10;

  const { loading, error, data, fetchMore } = useQuery<EarthquakeData>(
    GET_EARTHQUAKES,
    {
      variables: { limit, offset: 0 },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error fetching earthquakes.</p>;
  if (!data || !data.earthquakes) return <p>No data available.</p>;

  const { totalCount, earthquakes } = data.earthquakes;

  const handleSeeMore = () => {
    fetchMore({
      variables: {
        offset: earthquakes.length,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          earthquakes: {
            totalCount: fetchMoreResult.earthquakes.totalCount,
            earthquakes: [
              ...prevResult.earthquakes.earthquakes,
              ...fetchMoreResult.earthquakes.earthquakes,
            ],
          },
        };
      },
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Earthquake List</h2>
        <Link href="/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add Earthquake
          </button>
        </Link>
      </div>
      <div className="w-full overflow-x-auto border border-gray-200 rounded-lg">
        <div className="min-w-[768px]">
          <table className="w-full table-fixed bg-white">
            <thead>
              <tr>
                <th
                  style={{ width: "33.33%" }}
                  className="px-4 py-2 border-b text-left bg-gray-50"
                >
                  Location
                </th>
                <th
                  style={{ width: "16.67%" }}
                  className="px-4 py-2 border-b text-left bg-gray-50"
                >
                  Magnitude
                </th>
                <th
                  style={{ width: "33.33%" }}
                  className="px-4 py-2 border-b text-left bg-gray-50"
                >
                  Date
                </th>
                <th
                  style={{ width: "16.67%" }}
                  className="px-4 py-2 border-b text-left bg-gray-50"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {earthquakes.map((quake: Earthquake) => (
                  <motion.tr
                    key={quake.id}
                    initial={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                    className="hover:bg-gray-100"
                    style={{
                      borderSpacing: 0,
                      position: "relative",
                    }}
                  >
                    <td
                      style={{ width: "33.33%" }}
                      className="px-4 py-2 border-b"
                    >
                      <div className="truncate">{quake.location}</div>
                    </td>
                    <td
                      style={{ width: "16.67%" }}
                      className="px-4 py-2 border-b"
                    >
                      <div className="truncate">{quake.magnitude}</div>
                    </td>
                    <td
                      style={{ width: "33.33%" }}
                      className="px-4 py-2 border-b"
                    >
                      <div className="truncate">
                        {new Date(+quake.date).toLocaleString()}
                      </div>
                    </td>
                    <td
                      style={{ width: "16.67%" }}
                      className="px-4 py-2 border-b"
                    >
                      <div className="flex space-x-2">
                        <Link href={`/update/${quake.id}`}>
                          <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                            Update
                          </button>
                        </Link>
                        <DeleteEarthquakeButton id={quake.id} />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      {earthquakes.length < totalCount && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSeeMore}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default EarthquakeList;
