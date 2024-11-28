import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Earthquake {
    id: ID!
    location: String!
    magnitude: Float!
    date: String!
  }

  type EarthquakeConnection {
    totalCount: Int!
    earthquakes: [Earthquake!]!
  }

  type Query {
    earthquakes(limit: Int, offset: Int): EarthquakeConnection!
    earthquake(id: ID!): Earthquake
  }

  type Mutation {
    addEarthquake(
      location: String!
      magnitude: Float!
      date: String!
    ): Earthquake!
    updateEarthquake(
      id: ID!
      location: String
      magnitude: Float
      date: String
    ): Earthquake!
    deleteEarthquake(id: ID!): Boolean!
  }
`;

export default typeDefs;
