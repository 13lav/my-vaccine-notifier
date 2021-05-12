import express from 'express';
import {
    getLocationAll,
    getLocationByState,
    getLocationByDistrict,
} from '../controllers/location.js';

const router = express.Router();

router
    .route('/')
    .get(getLocationAll)

router
    .route('/:state_id/:district_id')
    .get(getLocationByDistrict)

router
    .route('/:state_id')
    .get(getLocationByState)

export default router;
