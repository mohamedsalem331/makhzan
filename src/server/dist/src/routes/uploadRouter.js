"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uploadController_1 = require("../controllers/uploadController");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../multer/multer"));
const router = express_1.default.Router();
router.post('/', multer_1.default.array('avatar', 3), uploadController_1.uploadImages);
exports.default = router;
