"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Library Imports
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
//Local Module Imports
const authRoutes_1 = require("./routes/authRoutes");
const userRoutes_1 = require("./routes/userRoutes");
//Defined Variables
const PORT = process.env.PORT || 3000;
const CONNECTION_URL = 'mongodb+srv://preethivhiremath:preethivhiremath@cluster0.srtwx.mongodb.net/lv';
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Routes
app.use('/user', userRoutes_1.userRoutes);
app.use('/auth', authRoutes_1.authRoutes);
//DB
mongoose_1.default.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('Connected to DB');
}).catch(error => console.log(error));
//Listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
