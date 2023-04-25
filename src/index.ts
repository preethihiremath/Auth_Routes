// Library Imports
import express from 'express'
import mongoose, {ConnectOptions} from 'mongoose'

//Local Module Imports
import { authRoutes } from './routes/authRoutes';
import { getAllUsers } from './controllers/authControllers';

//Defined Variables
const PORT = process.env.PORT || 3000;
const CONNECTION_URL ='mongodb+srv://preethivhiremath:preethivhiremath@cluster0.srtwx.mongodb.net/lv';

const app = express();
app.use(express.json());

//Routes
app.use('/allUsers', getAllUsers)
app.use('/auth', authRoutes);



mongoose.connect(CONNECTION_URL,{ 
    useNewUrlParser :  true,
    useUnifiedTopology: true,
    } as ConnectOptions )
    .then (
        () =>{
            console.log('Connected to DB')
        }
    ).catch(error=>console.log(error))


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})