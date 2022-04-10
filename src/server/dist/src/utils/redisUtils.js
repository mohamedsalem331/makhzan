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
exports.delRedisValue = exports.setRedisValue = exports.getRedisValue = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const setRedisValue = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield redis_1.default.set(key.toString(), JSON.stringify(value));
    yield redis_1.default.expire(key.toString(), 259200); // expires in 3 days
    if (!data)
        throw new Error();
    return data;
});
exports.setRedisValue = setRedisValue;
const getRedisValue = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield redis_1.default.get(key.toString());
    return data;
});
exports.getRedisValue = getRedisValue;
const delRedisValue = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield redis_1.default.del(key.toString());
    if (!data)
        throw new Error();
});
exports.delRedisValue = delRedisValue;
