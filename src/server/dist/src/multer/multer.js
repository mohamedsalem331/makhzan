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
exports.uploadImagesCloud = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("../config/cloudinary");
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, 'src/uploads/images/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb(null, 'Images format not acceptable');
    }
}
const upload = (0, multer_1.default)({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});
const uploadImagesCloud = (myFiles) => __awaiter(void 0, void 0, void 0, function* () {
    let myImages = [];
    // 1- store file in uploades/images through multer
    // 2- loop through each File
    // 3- ensure file path is true
    // 4- we call uploadCloudinary and pass file path to it to be uploaded on cloudinary
    // 5- we call async uploadCloudinary and pass file path and wait to be uploaded on cloudinary
    // 6- we call unlink func sync to ensure we remove the file stored on the file system
    // 7- we add the image url returned from cloudinary func and push it to the images
    // 8- return the images to the controller to resolve the route and return the images arr to client
    myImages = yield Promise.all(myFiles.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const fileExists = fs_1.default.statSync(file.path).isFile();
            if (fileExists) {
                const img = yield (0, cloudinary_1.uploadCloudinary)(file.path);
                fs_1.default.unlink(file.path, function (err) {
                    if (err)
                        return console.log(err);
                    console.log('file deleted successfully');
                });
                return img === null || img === void 0 ? void 0 : img.secure_url;
            }
        }
        catch (error) {
            console.log('file does not exist');
        }
    })));
    return myImages;
});
exports.uploadImagesCloud = uploadImagesCloud;
exports.default = upload;
