import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('makhzan', 'postgres', '25256268', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
})

export default sequelize
