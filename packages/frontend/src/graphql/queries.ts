import { gql } from "@apollo/client";

export const GET_EARTHQUAKES = gql`
  query GetEarthquakes($limit: Int, $offset: Int) {
    earthquakes(limit: $limit, offset: $offset) {
      totalCount
      earthquakes {
        id
        location
        magnitude
        date
      }
    }
  }
`;

export const GET_EARTHQUAKE = gql`
  query GetEarthquake($id: ID!) {
    earthquake(id: $id) {
      id
      location
      magnitude
      date
    }
  }
`;
