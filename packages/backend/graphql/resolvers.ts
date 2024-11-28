import Earthquake from "../models/earthquake";

const resolvers = {
  Query: {
    earthquakes: async (
      _: any,
      { limit = 10, offset = 0 }: { limit?: number; offset?: number }
    ) => {
      const totalCount = await Earthquake.count();
      const earthquakes = await Earthquake.findAll({
        limit,
        offset,
        order: [["date", "DESC"]],
      });
      return { totalCount, earthquakes };
    },
    earthquake: async (_: any, { id }: { id: number }) => {
      return await Earthquake.findByPk(id);
    },
  },
  Mutation: {
    addEarthquake: async (
      _: any,
      {
        location,
        magnitude,
        date,
      }: { location: string; magnitude: number; date: string }
    ) => {
      const earthquake = await Earthquake.create({
        location,
        magnitude,
        date: new Date(date),
      });
      return earthquake;
    },
    updateEarthquake: async (
      _: any,
      {
        id,
        location,
        magnitude,
        date,
      }: { id: number; location?: string; magnitude?: number; date?: string }
    ) => {
      const earthquake = await Earthquake.findByPk(id);
      if (!earthquake) {
        throw new Error("Earthquake not found");
      }
      if (location !== undefined) earthquake.location = location;
      if (magnitude !== undefined) earthquake.magnitude = magnitude;
      if (date !== undefined) earthquake.date = new Date(date);
      await earthquake.save();
      return earthquake;
    },
    deleteEarthquake: async (_: any, { id }: { id: number }) => {
      const earthquake = await Earthquake.findByPk(id);
      if (!earthquake) {
        throw new Error("Earthquake not found");
      }
      await earthquake.destroy();
      return true;
    },
  },
};

export default resolvers;
