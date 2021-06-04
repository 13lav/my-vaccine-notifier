import express from 'express';
import { addUser } from '../controllers/user.js';

const router = express.Router();

router.route('/notifyme')
    .post(addUser);

export default router;