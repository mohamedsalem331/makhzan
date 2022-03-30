import { rest } from 'msw';
import { baseUrl } from './apiUrl';

import { warehouses, users } from './data'



const getWarehousesPath = `${baseUrl}/warehouses`;
const getLoginPath = `${baseUrl}/users/login`;
const getWarehouseDetailsPath = `${baseUrl}/warehouses/123`;


// ============================================================================
// auth login handlers
// ============================================================================

const authUserHandler = rest.post(getLoginPath, async (req, res, ctx) => {
    return res(
        ctx.json({
            token: 'tokenvalid',
            name: 'John Peter',
            email: 'test@example.com',
            phoneNumber: '1234',
        }),
        ctx.delay(150)
    )
});

// ============================================================================
// warehouses handlers
// ============================================================================

const warehousesHandler = rest.get(getWarehousesPath, async (req, res, ctx) => {
    return res(ctx.json({ warehouses: [...warehouses], pending: false, error: '' }), ctx.delay(150))
});


export const warehousesHandlerException = rest.get(
    getWarehousesPath,
    async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Deliberately broken request' }))
    }
);

// ============================================================================
// warehouse details handlers
// ============================================================================

const warehousesDetailsHandler = rest.get(getWarehouseDetailsPath, async (req, res, ctx) => {
    return res(ctx.json({
        warehouse: warehouses[0],
        user: users[0],
        error: '',
        pending: false,
    }), ctx.delay(150))
});

export const warehouseDetailsHandlerException = rest.get(
    getWarehouseDetailsPath,
    async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Deliberately broken request' }))
    }
);

export const handlers = [authUserHandler, warehousesHandler, warehousesDetailsHandler];