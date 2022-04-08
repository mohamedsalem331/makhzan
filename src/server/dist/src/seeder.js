"use strict";
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
const pgsql_1 = __importDefault(require("./config/pgsql"));
const userModel_1 = __importDefault(require("./models/userModel"));
const warehouseModel_1 = __importDefault(require("./models/warehouseModel"));
const users_1 = __importDefault(require("./utils/data/users"));
const warehouses_1 = __importDefault(require("./utils/data/warehouses"));
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pgsql_1.default.sync();
        yield userModel_1.default.bulkCreate(users_1.default);
        yield warehouseModel_1.default.bulkCreate(warehouses_1.default);
        console.log('data created');
    }
    catch (e) {
        console.log(e);
    }
    process.exit(0);
});
const destoryData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pgsql_1.default.sync();
        yield warehouseModel_1.default.drop();
        yield userModel_1.default.drop();
        console.log('data destroyed');
    }
    catch (e) {
        console.log(e);
    }
    process.exit(0);
});
if (process.argv[2] === '-populate') {
    importData();
}
else if (process.argv[2] === '-destroy') {
    destoryData();
}
