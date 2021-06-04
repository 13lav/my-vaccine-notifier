import express from 'express';
import { getCentersByPin, getCentersByDistrict } from '../controllers/center.js';

const router = express.Router();

router
    .route('/byDistrict/:district')
    .get(getCentersByDistrict)

router
    .route('/byPincode/:pincode')
    .get(getCentersByPin)

export default router;