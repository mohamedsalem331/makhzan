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
exports.generateJWTAuthToken = exports.findByCredentials = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const pgsql_1 = __importDefault(require("../config/pgsql"));
const hashedPassword_1 = require("../utils/hashedPassword");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redisUtils_1 = require("../utils/redisUtils");
const User = pgsql_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    phoneNumber: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    isAdmin: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
});
User.beforeBulkCreate((users, options) => __awaiter(void 0, void 0, void 0, function* () {
    let hashedPassword;
    yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        hashedPassword = yield (0, hashedPassword_1.hashPass)(user.password);
        user.password = hashedPassword;
    })));
}));
User.beforeCreate((user, options) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, hashedPassword_1.hashPass)(user.password);
    user.password = hashedPassword;
}));
// Class Methods
function findByCredentials(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.findOne({ where: { email } });
        if (!user || !(user instanceof User)) {
            throw new Error('Unable to login, Wrong Email or Password');
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Password invalid');
        }
        return user;
    });
}
exports.findByCredentials = findByCredentials;
// Instance Methods
function generateJWTAuthToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user.id)
            throw new Error('user id invalid');
        const token = jsonwebtoken_1.default.sign({ id: user.id.toString() }, 'verysecretjwttokenmsg', {
            expiresIn: '4d',
        });
        if (!token)
            throw new Error('Token Creation Failed');
        yield (0, redisUtils_1.setRedisValue)(user.id.toString(), { token });
        return token;
    });
}
exports.generateJWTAuthToken = generateJWTAuthToken;
exports.default = User;
