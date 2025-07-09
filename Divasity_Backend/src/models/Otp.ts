import { DataTypes, Model } from "sequelize";
import { database } from "../config/database";

export interface OtpAttributes {
  id: string;
  user_id: string;
  otp_code: string;
  otp_expiry: Date;
}

export class Otp extends Model<OtpAttributes> {
  [x: string]: any;
}

Otp.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    otp_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp_expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "Otp",
    timestamps: true,
  }
);

export default Otp;
