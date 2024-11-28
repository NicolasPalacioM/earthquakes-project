import { Earthquake } from "./Earthquake";

export interface GetEarthquakesData {
  earthquakes: {
    totalCount: number;
    earthquakes: Earthquake[];
  };
}

export interface GetEarthquakeData {
  earthquake: Earthquake;
}
