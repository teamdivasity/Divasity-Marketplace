import { Model, DataTypes, Optional } from "sequelize";
import { database } from "../config/database";
import { User } from "./User";

export interface NewsAttributes {
  Newsid: string;
  UserId: string;
  Newstitle: string;
  Newsimage: string | null;
  Newscontent: string;
  links: string | null; // Changed from string[] to string
  categories: string | null; // Changed from string[] to string
}

export interface NewsCreationAttributes
  extends Optional<
    NewsAttributes,
    "Newsid" | "Newsimage" | "links" | "categories"
  > {}

export class News extends Model<NewsAttributes, NewsCreationAttributes> {
  [x: string]: any;
  
  // Custom getters for array fields
  get linksArray(): string[] | null {
    return this.links ? JSON.parse(this.links) : null;
  }
  
  get categoriesArray(): string[] | null {
    return this.categories ? JSON.parse(this.categories) : null;
  }
}

News.init(
  {
    Newsid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    Newstitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Newsimage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    Newscontent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    links: {
      type: DataTypes.TEXT, // Changed from JSON to TEXT
      allowNull: true,
      defaultValue: null,
    },
    categories: {
      type: DataTypes.TEXT, // Changed from ARRAY to TEXT
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize: database,
    tableName: "News",
    timestamps: true,
  }
);

News.belongsTo(User, { foreignKey: "UserId", as: "User" });

export default News;