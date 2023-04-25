"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.authRoutes = express_1.default.Router();
exports.authRoutes.post('/register', authControllers_1.register);
exports.authRoutes.post('/login', authControllers_1.login);
exports.authRoutes.post('/logout', authControllers_1.logout);
exports.authRoutes.post('/changepassword', authMiddleware_1.verifyAuthMiddleware, authControllers_1.changePassword);
