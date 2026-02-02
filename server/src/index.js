import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import weatherRoute from './routes/weather.route.js'
dotenv.config();

const app = express();

//middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}));
const port = process.env.PORT;
app.use("/weather-forecast",weatherRoute);
app.listen(port,()=>{
    console.log("server started at ",port);
})