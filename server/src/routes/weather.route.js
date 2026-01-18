import express from 'express'
import {getCityForecast} from '../controllers/weather.controller.js'
const router = express.Router();

router.get("/:city",getCityForecast);

export default router;