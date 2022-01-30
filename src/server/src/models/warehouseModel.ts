import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '../config/pgsql'
import { WarehouseAttributes } from '../constants/types'

interface WarehouseCreationAttributes extends Optional<WarehouseAttributes, 'id'> {}

interface WarehouseInstance
  extends Model<WarehouseAttributes, WarehouseCreationAttributes>,
    WarehouseAttributes {}

const Warehouse = sequelize.define<WarehouseInstance>('Warehouse', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
  "userId" INTEGER REFERENCES "Teams" ("id") ON DELETE SET NULL ON UPDATE CASCADE, // foreign key
})

export default Warehouse
