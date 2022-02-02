import { Request, Response } from 'express'
import Warehouse from '../models/warehouseModel'
import { WarehouseAttributes, IFilters } from '../constants/types'
import { Op } from 'sequelize'
import { setRedisValue, delRedisValue } from '../utils/redisUtils'

// 400 Bad Request -> The 400 status code, or Bad Request error, means the HTTP request that was sent to the server has invalid syntax.
// 401 unauthneticated
// 403 unauthorized

// @desc    fetch all warehouses
// @route   GET /warehouses
// @access  Public

const getAllWarehouses = async (req: Request, res: Response) => {
  let warehouses
  try {
    // const filters: IFilters = req.body
    const filters = req.body

    // const rentFilter = filters.rent ? filters.rent : [0]

    Object.keys(filters)

    warehouses = Warehouse.findAll({
      where: {
        rent: {
          [Op.between]: filters.rent,
        },
        size: {
          [Op.between]: filters.size,
        },
        governorate: {
          [Op.eq]: filters.governorate,
        },
        location: {
          [Op.eq]: filters.governorate,
        },
      },
    })

    if (!warehouses) throw new Error('Couldnt retreive all warehouses')

    res.status(200).send({ warehouses })
  } catch (e: any) {
    let errorMessage = 'Wrong Credentials'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(400).send({ error: e.message })
  }
}

// @desc    post or create a warehouse
// @route   POST /warehouses/create
// @access  Private
const createWarehouse = async (req: Request, res: Response) => {
  try {
    const NewWarehouse: WarehouseAttributes = req.body

    const warehouse = await Warehouse.create(NewWarehouse)

    if (!warehouse) {
      return res.status(400).send({ message: 'Error happened with Warehouse Creation' })
    }

    res.status(200).send({ message: 'Warehouse Created' })
  } catch (e: any) {
    let errorMessage = 'Warehouse not created'
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

    if (!warehouse) throw new Error('Warehouse not found')

    res.status(200).send({ warehouse })
  } catch (e: any) {
    let errorMessage = 'Wrong Credentials'
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

    await Warehouse.destroy({
      where: {
        id,
      },
    })

    res.status(200).send({ message: 'Warehouse deleted' })
  } catch (e: any) {
    let errorMessage = 'Wrong Credentials'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(400).send({ error: e.message })
  }
}

export { getAllWarehouses, getWarehouse, createWarehouse, deleteWarehouse }
