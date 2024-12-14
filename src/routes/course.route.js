import {Router} from 'express'
import { verifyJWTToken } from "../middlewares/auth.middleware.js";
import { addCourse, getCourse, getCourses } from '../controllers/course.controller.js';
import multer from 'multer';
import path from 'node:path';
const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //   cb(null,  path.join(__dirname, '/Images')); // Directory to save files
    // },
    destination: "files/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname); // Rename file to avoid collisions
    },
  });
  
  const upload = multer({ storage });
const router =  Router()

router.route('/add').post(upload.single('image'), addCourse)
router.route('/:id').get( getCourses)
router.route('/single/:id').get( getCourse)

export default router