import express from 'express'
import { avatarController } from '../controller/avatarController.js';
const router = express.Router();

router.post('/upload',avatarController)

export {router}