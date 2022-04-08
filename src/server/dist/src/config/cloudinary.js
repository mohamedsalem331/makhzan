"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
require('dotenv').config();
//process.ev
cloudinary_1.default.v2.config({
    cloud_name: 'makhzan',
    api_key: process.env.API_CLOUD_KEY,
    api_secret: process.env.API_SECRET_KEY,
});
const uploadCloudinary = (file_path) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.default.v2.uploader.upload(file_path, function (error, result) {
            if (error)
                reject('upload on cloudinary failed');
            resolve(result);
        });
    });
};
exports.uploadCloudinary = uploadCloudinary;
