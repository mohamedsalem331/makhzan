import { rest } from 'msw';
import { baseUrl } from './api-url';

import { warehouses, users } from './fixtures'

const getWarehousesPath = `${baseUrl}/warehouses`;
const getLoginPath = `${baseUrl}/users/login`;
const getWarehouseDetailsPath = `${baseUrl}/warehouses/123`;
const getWarehouseCreationPath = `${baseUrl}/warehouses/create`;


// ============================================================================
// AUTH LOGIN HANDLERS
// ============================================================================

export const authUserHandler = rest.post(getLoginPath, async (req, res, ctx) => {
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

export const authHandlerException = rest.post(
    getLoginPath,
    async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Deliberately broken request', pending: false }))
    }
);

// ============================================================================
// WAREHOUSESLIST HANDLERS
// ============================================================================

const filteredWarehousesHandler = rest.get(getWarehousesPath, async (req, res, ctx) => {
    return res(ctx.json({ warehouses: [...warehouses], pending: false, error: '' }), ctx.delay(150))
});

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
// POSTING/CREATING WAREHOUSE HANDLERS
// ============================================================================

const warehouseCreationHandler = rest.post(getWarehouseCreationPath, async (req, res, ctx) => {
    return res(ctx.json({
        message: "Warehouse Created",
        error: '',
        pending: false,
    }), ctx.delay(150))
});

export const warehouseCreationHandlerException = rest.post(getWarehouseCreationPath, async (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({
        error: 'Deliberately broken request',
    }))
});

const uploadImageHandler = rest.post('http://localhost:5000/uploads', async (req, res, ctx) => {
    return res(ctx.json({
        myImages: ['image1', 'image2']
    }), ctx.delay(150))
});

// ============================================================================
// WAREHOUSE DETAILS HANDLERS
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

export const handlers = [authUserHandler, filteredWarehousesHandler, warehousesHandler, warehousesDetailsHandler, warehouseCreationHandler, uploadImageHandler, warehouseCreationHandlerException];