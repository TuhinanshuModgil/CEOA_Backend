import {Router} from 'express'
import { verifyJWTToken } from "../middlewares/auth.middleware.js";
import { addProgram, editProgram, getProgram, getPrograms } from '../controllers/program.controller.js';

const router = Router()

router.route('/add').post(addProgram)
router.route('/:id').get(getProgram)
router.route('/').get(getPrograms)
router.route('/edit/:id').put(editProgram)


export default router