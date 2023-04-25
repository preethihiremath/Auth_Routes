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
exports.logout = exports.changePassword = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //check if they already exist
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'user already exist' });
        }
        // console.log(email)
        // console.log(password)
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const newUser = new User_1.User({ email, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({ message: 'New User created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield User_1.User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'No User, Please Register' });
        }
        //Check Password
        const isPasswordValid = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'OOPS Wrong Password' });
        }
        //Create Token if Valid
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id, email: existingUser.email, isAdmin: existingUser.isAdmin }, 'secret', { expiresIn: '1d' });
        //TODO : Store the token in localStorage
        res.status(200).json({ result: existingUser, token });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.login = login;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, oldPassword, newPassword } = req.body;
    try {
        const existingUser = yield User_1.User.findById(_id);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(oldPassword, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'OOPS Wrong Password' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 12);
        existingUser.password = hashedPassword;
        yield existingUser.save();
        res.status(200).json({ message: 'Password changed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.changePassword = changePassword;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //TODO: Clear Token if stored in LocalStorage
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error Logging Out' });
    }
});
exports.logout = logout;
