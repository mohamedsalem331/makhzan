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
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING(600), allowNull: false },
  size: { type: DataTypes.INTEGER, allowNull: false },
  rent: { type: DataTypes.INTEGER, allowNull: false },
  governorate: { type: DataTypes.STRING, defaultValue: 'cairo' },
  location: { type: DataTypes.STRING, allowNull: false },
  street: { type: DataTypes.STRING, allowNull: false },
  services: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  images: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  UserId: { type: DataTypes.UUID, allowNull: false },
})

export default Warehouse
