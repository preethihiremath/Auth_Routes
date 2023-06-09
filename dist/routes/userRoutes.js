"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.get('/all', userControllers_1.getAllUsers);
//userRoutes.get('/:id',getUser)
//userRoutes.put('/:id', verifyAuthMiddleware,updateUserInfo)
//userRoutes.delete('/:id',verifyAuthMiddleware, deleteUser)
