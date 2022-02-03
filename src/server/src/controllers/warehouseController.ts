import { Request, Response } from 'express'
import Warehouse from '../models/warehouseModel'
import User from '../models/userModel'
import { WarehouseAttributes } from '../constants/types'
import { Op } from 'sequelize'

// 400 Bad Request -> The 400 status code, or Bad Request error, means the HTTP request that was sent to the server has invalid syntax.
// 401 unauthneticated
// 403 unauthorized

// @desc    fetch all warehouses
// @route   GET /warehouses
// @access  Public
const getAllWarehouses = async (req: Request, res: Response) => {
  let warehouses

  try {
    warehouses = await Warehouse.findAll()

    if (!warehouses || !warehouses.every((warehouse) => warehouse instanceof Warehouse)) {
      throw new Error('Couldnt retreive all warehouses')
    }

    res.status(200).send({ warehouses })
  } catch (e: any) {
    let errorMessage = 'Something went wrong, fetching warehouses'
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
    const filters = req.body

    if (!filters) throw new Error('error happened with filtering warehouses')

    const maxRent = await Warehouse.max('rent')
    const maxSize = await Warehouse.max('size')

    warehouses = await Warehouse.findAll({
      where: {
        rent: {
          [Op.between]: filters.rent ? filters.rent : [0, maxRent],
        },
        size: {
          [Op.between]: filters.rent ? filters.rent : [0, maxSize],
        },
        governorate: {
          [Op.or]: filters.governorate,
        },
        services: { [Op.contains]: filters.services },
      },
    })

    if (!warehouses || !warehouses.every((warehouse) => warehouse instanceof Warehouse)) {
      throw new Error('Couldnt filter all warehouses')
    }
    res.status(200).send({ warehouses })
  } catch (e: any) {
    let errorMessage = 'Something went wrong, filtering warehouses'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(400).send({ error: e.message })
  }
}

// @desc    post/create a warehouse
// @route   POST /warehouses/create
// @access  Private
const createWarehouse = async (req: Request, res: Response) => {
  try {
    const NewWarehouse: WarehouseAttributes = req.body

    const warehouse = await Warehouse.create(NewWarehouse)

    if (!warehouse || !(warehouse instanceof Warehouse)) {
      return res.status(400).send({ message: 'Error happened with Warehouse Creation' })
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
    const id: string = req.body.params

    const warehouse = Warehouse.findByPk(id)

    if (!warehouse || !(warehouse instanceof Warehouse)) throw new Error('Warehouse not found')

    res.status(200).send({ warehouse })
  } catch (e: any) {
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
  try {
    const id = req.params.id

    // const user = req.userData

    // if (!user || !(user instanceof User)) throw new Error('User Not Found or Unauthorized')

    // if (user.id !== Warehouse.foreginKey) {
    //    throw new Error('Unauthorized operation')
    // }

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
    res.status(400).send({ error: e.message })
  }
}

export { getAllWarehouses, getWarehouse, createWarehouse, deleteWarehouse, filterAllWarehouses }
