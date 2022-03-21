import { Request, Response } from 'express'
import Warehouse from '../models/warehouseModel'
import User from '../models/userModel'
import { WarehouseAttributes, UserAttributes } from '../constants/types'
import { Op } from 'sequelize'
var _ = require('lodash')

// 400 Bad Request -> The 400 status code, or Bad Request error, means the HTTP request that was sent to the server has invalid syntax.
// 401 unauthneticated
// 403 unauthorized

// @desc    fetch all warehouses
// @route   GET /warehouses
// @access  Public
const getAllWarehouses = async (req: Request, res: Response) => {
  let warehouses: Array<object> = []
  let userWarehouses: Array<object> | [] = []
  let UserId: string | undefined

  const maxRent = await Warehouse.max('rent')
  const maxSize = await Warehouse.max('size')

  try {
    UserId = req?.header('UserID')

    warehouses = await Warehouse.findAll()

    if (UserId) {
      userWarehouses = await Warehouse.findAll({
        where: {
          UserId,
        },
      })
      warehouses = _.filter(warehouses, function (storage_unit: WarehouseAttributes) {
        return storage_unit.UserId !== UserId
      })
    }

    if (
      !warehouses ||
      !userWarehouses ||
      !warehouses.every((warehouse) => warehouse instanceof Warehouse)
    ) {
      throw new Error('Couldnt retreive all warehouses')
    }

    res.status(200).send({ warehouses: [...userWarehouses, ...warehouses], maxRent, maxSize })
  } catch (e: any) {

    let errorMessage = 'Something went wrong, couldnt fetch warehouses'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(400).send({ error: e.message })
  }
}

// @desc    filter  warehouses
// @route   POST /warehouses
// @access  Public
const filterAllWarehouses = async (req: Request, res: Response) => {
  let warehouses

  try {
    const { governorates, locations, rent, size } = req.body
    console.log(typeof req.body.size[0]);

    if (!req.body) throw new Error('error happened -> filtering warehouses')

    const maxRent = await Warehouse.max('rent')
    const maxSize = await Warehouse.max('size')

    // rent[0] === minRent 
    // rent[1] === maxRent

    // [0,0]  -> true
    // [20,0] -> true
    // [20,10] -> true
    // [20,20] -> 
    // [0,20] 
    // [10,20] 



    warehouses = await Warehouse.findAll({
      where: {
        rent: {
          [Op.between]: rent && rent[0] + rent[1] > 0 && rent[1] > rent[0] ? rent : [rent[0], maxRent]
        },
        size: {
          [Op.between]: size && size[0] + size[1] > 0 && size[1] > size[0] ? size : [size[0], maxSize]
        },
        governorate: {
          [Op.or]: governorates,
        },
        location: {
          [Op.or]: locations,
        },
      },
    })

    if (!warehouses || !warehouses.every((warehouse: any) => warehouse instanceof Warehouse)) {
      throw new Error('Couldnt filter all warehouses')
    }
    res.status(200).send({ warehouses })
  } catch (e: any) {

    let errorMessage = 'Something went wrong, filtering warehouses'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(400).send({ error: errorMessage })
  }
}

// @desc    post/create a warehouse
// @route   POST /warehouses/create
// @access  Private
const createWarehouse = async (req: Request, res: Response) => {
  try {
    const userData = res.locals.user
    if (!userData) throw new Error("Authentication invalid")
    const NewWarehouse: WarehouseAttributes = req.body

    const warehouse = await Warehouse.create({ ...NewWarehouse, UserId: userData.id })

    if (!warehouse || !(warehouse instanceof Warehouse)) {
      throw new Error('Error happened with Creaing Warehouse Instance')
    }

    res.status(201).send({ message: 'Warehouse Created' })
  } catch (e: any) {
    let errorMessage = 'Unable to create Warehouse'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(400).send({ error: e.message })
  }
}

// @desc    fetch warehouse by id
// @route   GET /warehouses/:id
// @access  Public
const getWarehouse = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id

    const warehouse = await Warehouse.findByPk(id)

    if (!warehouse || !(warehouse instanceof Warehouse)) throw new Error('Warehouse not found')

    const user = await User.findByPk(warehouse.UserId, { attributes: ['name', 'email', 'phoneNumber'] })

    if (!user || !(user instanceof User)) throw new Error('Associated User not found')

    res.status(200).send({ warehouse, user })
  } catch (e: any) {
    console.log(e)

    let errorMessage = 'Unable to fetch warehouse'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(400).send({ error: e.message })
  }
}

// @desc    delete warehouse by id
// @route   DELETE /warehouses/:id
// @access  Private
const deleteWarehouse = async (req: Request, res: Response) => {
  let user: UserAttributes
  let warehouse: WarehouseAttributes | null

  try {
    const id: string = req.params.id

    user = res.locals.user

    if (!user || !(user instanceof User)) {
      throw new Error('User Not Found or Unauthorized to Delete this associated warehouse')
    }

    warehouse = await Warehouse.findByPk(id)

    if (user.id !== warehouse?.UserId) {
      throw new Error('Unauthorized operation')
    }

    await Warehouse.destroy({
      where: {
        id,
      },
    })

    res.status(200).send({ message: 'Warehouse deleted' })
  } catch (e: any) {
    let errorMessage = 'Unable to delete the warehouse'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(403).send({ error: e.message })
  }
}

export { getAllWarehouses, getWarehouse, createWarehouse, deleteWarehouse, filterAllWarehouses }
