import { Model, DataTypes } from 'sequelize';
import db from './index';

class User extends Model {
  public id!: number;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public image!: string;
  public pdf!: Buffer;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pdf: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize: db.sequelize,
  },
);

export default User;
