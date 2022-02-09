import supertest from 'supertest'
import { v4 as uuidv4 } from 'uuid'
require('dotenv').config()

import initializeServer from '../src/initializeServer'
import sequelize from '../src/config/pgsql'
import redis_client from '../src/config/redis'
import Warehouse from '../src/models/warehouseModel'
import User, { generateJWTAuthToken } from '../src/models/userModel'
import { WarehouseAttributes, UserAttributes } from '../src/constants/types'
import { getRedisValue } from '../src/utils/redisUtils'

const app = initializeServer()

const WarehouseOneID: string = uuidv4()
const WarehouseTwoID: string = uuidv4()
const UserOneID: string = uuidv4()
const UserTwoID: string = uuidv4()
const UserThreeID: string = uuidv4()

const warehouseOne: WarehouseAttributes = {
  id: WarehouseOneID,
  title: 'Warehouse 1500 SQM licensed Food & Beverage',
  description: 'Warehouse for Rent in New Cairo Alf Masnaa Area.Spa',
  size: 1500,
  rent: 150000,
  governorate: 'cairo',
  location: '6 october city',
  street: '112',
  services: ['wifi', 'iot', 'bathroom'],
  images: ['https://res.cloudinary.com/makhzan/image/upload/v1643349711/cld-sample.jpg'],
  UserId: UserOneID,
}

const warehouseTwo: WarehouseAttributes = {
  id: WarehouseTwoID,
  title: 'Warehouse 1500 SQM licensed Food & Beveragerew',
  description: 'Warehouse for Rent in New Cairo Alf Masnaa Arearwerwe.Spa',
  size: 1500,
  rent: 200000,
  governorate: 'cairo',
  location: '6 october city',
  street: '112',
  services: ['wifi', 'iot', 'bathroom'],
  images: ['https://res.cloudinary.com/makhzan/image/upload/v1643349711/cld-sample.jpg'],
}

const userOne: UserAttributes = {
  id: UserOneID,
  name: 'Admin User',
  email: 'admin1@example.com',
  password: 'hello123',
  isAdmin: true,
  phoneNumber: 1234567,
}

const userTwo: UserAttributes = {
  id: UserTwoID,
  name: 'Jack Smith',
  email: 'user@example.com',
  password: 'hello123',
  phoneNumber: 7654321,
}

const userThree: UserAttributes = {
  id: UserThreeID,
  name: 'William Edward',
  email: 'user2@example.com',
  password: 'hello1234',
  phoneNumber: 76543215,
}

describe('testing random routes', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
    await redis_client.connect()
    await User.create(userOne)
    await User.create(userTwo)
    await Warehouse.create(warehouseOne)
  })

  describe('Warehouse Routes', () => {
    test('Should get all warehouses', async () => {
      const response = await supertest(app).get('/warehouses').expect(200)

      expect(response.body.warehouses).toHaveLength(1)
      expect(response.body.warehouses[0]).toHaveProperty('id', WarehouseOneID)
    })

    test('Should create a new warehouse with authenticated user', async () => {
      const token = await generateJWTAuthToken(userOne)

      const response = await supertest(app)
        .post('/warehouses/create')
        .set('Authorization', `Bearer ${token}`)
        .send(warehouseTwo)
        .expect(201)

      expect(response.body).toMatchObject({
        message: 'Warehouse Created',
      })
    })

    test('Should filter warehouses based on body attributes', async () => {
      const response = await supertest(app)
        .post('/warehouses')
        .send({
          rent: [0, 170000],
          governorate: ['cairo'],
          services: [],
        })
        .expect(200)

      expect(response.body.warehouses).toHaveLength(1)
    })

    test('Should get warehouse with this associated id', async () => {
      const response = await supertest(app).get(`/warehouses/${WarehouseOneID}`).expect(200)

      expect(response.body.warehouse).not.toBeNull()
      expect(response.body.warehouse).toHaveProperty('id', WarehouseOneID)
    })

    test('Should delete warehouse with this associated id and authenticated user', async () => {
      const token = await generateJWTAuthToken(userOne)

      const response = await supertest(app)
        .delete(`/warehouses/${WarehouseOneID}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(response.body).toMatchObject({
        message: 'Warehouse deleted',
      })
    })

    test('Should not delete warehouse for unauthneticated user', async () => {
      const response = await supertest(app).delete(`/warehouses/${WarehouseOneID}`).expect(401)

      expect(response.body).toMatchObject({ error: 'Your session is not valid. Token is Invalid' })
    })

    test('Should not delete warehouse for unauthorized user', async () => {
      const token = await generateJWTAuthToken(userTwo)

      const response = await supertest(app)
        .delete(`/warehouses/${WarehouseOneID}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403)

      expect(response.body).toMatchObject({
        error: 'Unauthorized operation',
      })
    })
  })

  describe('User Routes', () => {
    test('Should signup a new user', async () => {
      const response = await supertest(app).post('/users/register').send(userThree).expect(201)

      expect(response.body.message).toEqual('User Created')
      expect(response.body.token).not.toBeNull()
    })

    test('Should login existing user', async () => {
      const response = await supertest(app)
        .post('/users/login')
        .send({
          email: userThree.email,
          password: userThree.password,
        })
        .expect(200)

      const user = await User.findByPk(UserThreeID)
      const token = await getRedisValue(UserThreeID)
      if (!token) throw new Error()
      expect(user).toBeInstanceOf(User)
      const parsedToken = JSON.parse(token)

      expect(response.body.token).toEqual(parsedToken.token)
    })

    test('Should not login nonexistent user', async () => {
      await supertest(app)
        .post('/users/login')
        .send({
          email: userThree.email,
          password: 'thisisnotmypass',
        })
        .expect(401)
    })

    test('Should logout user', async () => {
      const token = await generateJWTAuthToken(userThree)

      const response = await supertest(app)
        .post('/users/logout')
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(200)

      expect(response.body).toMatchObject({ message: 'User Logged out' })
    })

    test('Should delete user', async () => {
      const token = await generateJWTAuthToken(userOne)

      const response = await supertest(app)
        .delete(`/users/delete/${UserThreeID}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(200)

      const user = await User.findByPk(UserThreeID)

      expect(user).toBeNull()
      expect(response.body).toMatchObject({ message: 'User Deleted With Associated warehouses' })
    })

    test('Should get all users', async () => {
      const token = await generateJWTAuthToken(userOne)

      const response = await supertest(app)
        .get(`/users`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(200)

      expect(response.body.users).toHaveLength(2)
    })

    test('Should not get all users for non admin/unauthorized users', async () => {
      const token = await generateJWTAuthToken(userTwo)

      const response = await supertest(app)
        .get(`/users`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(403)
    })
  })

  afterAll(async () => {
    await sequelize.close()
    await redis_client.quit()
  })
})