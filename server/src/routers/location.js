import express from 'express';
import {
    //getLocationAll,
    //getLocationByState,
    getLocationByDistrict,
} from '../controllers/location.js';

const router = express.Router();

router
    .route('/district')
    .post(getLocationByDistrict)
/*
router
    .route('/:state_id')
    .get(getLocationByState)

router
    .route('/')
    .get(getLocationAll)
*/
export default router;
