import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();
import sequelize from './db';
import router from './routes';
import { StatusCode } from './const';


const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);


app.get('/', (req, res) => {
    res.status(StatusCode.Ok).json({ message: `server started on port ${PORT}` })
})


const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => console.log(`Started on port ${PORT}`));
    } catch (err) {
        console.error(err);
    }
}


start();