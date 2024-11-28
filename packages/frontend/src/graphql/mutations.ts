import { gql } from "@apollo/client";

export const ADD_EARTHQUAKE = gql`
  mutation AddEarthquake(
    $location: String!
    $magnitude: Float!
    $date: String!
  ) {
    addEarthquake(location: $location, magnitude: $magnitude, date: $date) {
      id
      location
      magnitude
      date
    }
  }
`;

export const UPDATE_EARTHQUAKE = gql`
  mutation UpdateEarthquake(
    $id: ID!
    $location: String
    $magnitude: Float
    $date: String
  ) {
    updateEarthquake(
      id: $id
      location: $location
      magnitude: $magnitude
      date: $date
    ) {
      id
      location
      magnitude
      date
    }
  }
`;

export const DELETE_EARTHQUAKE = gql`
  mutation DeleteEarthquake($id: ID!) {
    deleteEarthquake(id: $id)
  }
`;
