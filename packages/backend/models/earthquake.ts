import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

class Earthquake extends Model<
  InferAttributes<Earthquake>,
  InferCreationAttributes<Earthquake>
> {
  declare id: CreationOptional<number>;
  declare location: string;
  declare magnitude: number;
  declare date: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof Earthquake {
    Earthquake.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        magnitude: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "Earthquakes",
      }
    );

    return Earthquake;
  }
}

export default Earthquake;
