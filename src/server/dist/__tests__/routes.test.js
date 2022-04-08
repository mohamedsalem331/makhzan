"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const uuid_1 = require("uuid");
require('dotenv').config();
const users_1 = __importDefault(require("../src/utils/data/users"));
const warehouses_1 = __importDefault(require("../src/utils/data/warehouses"));
const initializeServer_1 = __importDefault(require("../src/initializeServer"));
const pgsql_1 = __importDefault(require("../src/config/pgsql"));
const redis_1 = __importDefault(require("../src/config/redis"));
const warehouseModel_1 = __importDefault(require("../src/models/warehouseModel"));
const userModel_1 = __importStar(require("../src/models/userModel"));
const redisUtils_1 = require("../src/utils/redisUtils");
const app = (0, initializeServer_1.default)();
const WarehouseOneID = (0, uuid_1.v4)();
const WarehouseTwoID = (0, uuid_1.v4)();
const UserOneID = (0, uuid_1.v4)();
const UserTwoID = (0, uuid_1.v4)();
const UserThreeID = (0, uuid_1.v4)();
const warehouseOne = Object.assign(Object.assign({}, warehouses_1.default[0]), { id: WarehouseOneID, UserId: UserOneID });
const warehouseTwo = Object.assign(Object.assign({}, warehouses_1.default[1]), { id: WarehouseTwoID, UserId: UserTwoID });
const userOne = Object.assign(Object.assign({}, users_1.default[0]), { id: UserOneID });
const userTwo = Object.assign(Object.assign({}, users_1.default[1]), { id: UserTwoID });
const userThree = Object.assign(Object.assign({}, users_1.default[2]), { id: UserThreeID });
describe('testing random routes', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield pgsql_1.default.sync({ force: true });
        yield redis_1.default.connect();
        yield userModel_1.default.create(userOne);
        yield userModel_1.default.create(userTwo);
        yield warehouseModel_1.default.create(warehouseOne);
    }));
    describe('Warehouse Routes', () => {
        test('Should get all warehouses', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/warehouses').expect(200);
            expect(response.body.warehouses).toHaveLength(1);
            expect(response.body.warehouses[0]).toHaveProperty('id', WarehouseOneID);
        }));
        test('Should create a new warehouse with authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield (0, userModel_1.generateJWTAuthToken)(userOne);
            const response = yield (0, supertest_1.default)(app)
                .post('/warehouses/create')
                .set('Authorization', `Bearer ${token}`)
                .send(warehouseTwo)
                .expect(201);
            expect(response.body).toMatchObject({
                message: 'Warehouse Created',
            });
        }));
        test('Should filter warehouses based on body attributes', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .post('/warehouses')
                .send({
                rent: [0, 0],
                size: [0, 0],
                governorates: ['Cairo'],
                locations: [],
            })
                .expect(200);
            expect(response.body.warehouses).toHaveLength(1);
        }));
        test('Should get warehouse with this associated id', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get(`/warehouses/${WarehouseOneID}`).expect(200);
            expect(response.body.warehouse).not.toBeNull();
            expect(response.body.warehouse).toHaveProperty('id', WarehouseOneID);
        }));
        test('Should delete warehouse with this associated id and authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield (0, userModel_1.generateJWTAuthToken)(userOne);
            const response = yield (0, supertest_1.default)(app)
                .delete(`/warehouses/${WarehouseOneID}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
            expect(response.body).toMatchObject({
                message: 'Warehouse deleted',
            });
        }));
        test('Should not delete warehouse for unauthneticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).delete(`/warehouses/${WarehouseOneID}`).expect(401);
            expect(response.body).toMatchObject({ error: 'Your session is not valid. Token is Invalid' });
        }));
        test('Should not delete warehouse for unauthorized user', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield (0, userModel_1.generateJWTAuthToken)(userTwo);
            const response = yield (0, supertest_1.default)(app)
                .delete(`/warehouses/${WarehouseOneID}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(403);
            expect(response.body).toMatchObject({
                error: 'Unauthorized operation',
            });
        }));
    });
    describe('User Routes', () => {
        test('Should signup a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/users/register').send(userThree).expect(201);
            expect(response.body.message).toEqual('User Created');
            expect(response.body.token).not.toBeNull();
        }));
        test('Should login existing user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .post('/users/login')
                .send({
                email: userThree.email,
                password: userThree.password,
            })
                .expect(200);
            const user = yield userModel_1.default.findByPk(UserThreeID);
            const token = yield (0, redisUtils_1.getRedisValue)(UserThreeID);
            if (!token)
                throw new Error();
            expect(user).toBeInstanceOf(userModel_1.default);
            const parsedToken = JSON.parse(token);
            expect(response.body.token).toEqual(parsedToken.token);
        }));
        test('Should not login nonexistent user', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app)
                .post('/users/login')
                .send({
                email: userThree.email,
                password: 'thisisnotmypass',
            })
                .expect(401);
        }));
        test('Should logout user', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield (0, userModel_1.generateJWTAuthToken)(userThree);
            const response = yield (0, supertest_1.default)(app)
                .post('/users/logout')
                .set('Authorization', `Bearer ${token}`)
                .send()
                .expect(200);
            expect(response.body).toMatchObject({ message: 'User Logged out' });
        }));
        test('Should delete user', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield (0, userModel_1.generateJWTAuthToken)(userOne);
            const response = yield (0, supertest_1.default)(app)
                .delete(`/users/delete/${UserThreeID}`)
                .set('Authorization', `Bearer ${token}`)
                .send()
                .expect(200);
            const user = yield userModel_1.default.findByPk(UserThreeID);
            expect(user).toBeNull();
            expect(response.body).toMatchObject({ message: 'User Deleted With Associated warehouses' });
        }));
        test('Should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield (0, userModel_1.generateJWTAuthToken)(userOne);
            const response = yield (0, supertest_1.default)(app)
                .get(`/users`)
                .set('Authorization', `Bearer ${token}`)
                .send()
                .expect(200);
            expect(response.body.users).toHaveLength(2);
        }));
        test('Should not get all users for non admin/unauthorized users', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield (0, userModel_1.generateJWTAuthToken)(userTwo);
            const response = yield (0, supertest_1.default)(app)
                .get(`/users`)
                .set('Authorization', `Bearer ${token}`)
                .send()
                .expect(403);
        }));
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield pgsql_1.default.close();
        yield redis_1.default.quit();
    }));
});
