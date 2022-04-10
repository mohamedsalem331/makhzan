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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = void 0;
const multer_1 = require("../multer/multer");
// 400 Bad Request -> The 400 status code, or Bad Request error, means the HTTP request that was sent to the server has invalid syntax.
// 401 unauthneticated
// 403 unauthorized
// @desc    fetch all users
// @route   GET /users
// @access  Private/Admin
const uploadImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = JSON.parse(JSON.stringify(req.files));
        const myImages = yield (0, multer_1.uploadImagesCloud)(files);
        res.send({ myImages });
    }
    catch (e) {
        res.status(404).send({ message: 'error Image upload' });
    }
});
exports.uploadImages = uploadImages;
