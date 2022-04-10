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
const pgsql_1 = __importDefault(require("../config/pgsql"));
const redis_1 = __importDefault(require("../config/redis"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pgsql_1.default.authenticate();
        yield pgsql_1.default.sync({ alter: true });
        console.log('Database Connected Successfully.');
    }
    catch (error) {
        pgsql_1.default.close();
        process.exit(1);
    }
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        redis_1.default.on('error', (err) => console.log('Redis Client Error', err));
        yield redis_1.default.connect();
        console.log('Redis Connected Successfully.');
    }
    catch (e) {
        console.log(e);
        redis_1.default.quit();
        process.exit(1);
    }
}))();
