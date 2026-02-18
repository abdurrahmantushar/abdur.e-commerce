import {Router} from 'express'
import { auth } from "../middleware/auth-middleware.js";
import { getBannerController, getMObileBannerController, uploadBannerController, uploadImageController, uploadMobileBannerController } from '../controllers/uploadImageController.js';
import { upload } from "../middleware/multer-middleware.js";

const uploadRouter = Router()

uploadRouter.post('/upload',auth,upload.single('image'),uploadImageController)
uploadRouter.put('/banner-upload',auth,upload.single('image'),uploadBannerController)
uploadRouter.get('/get-banner',getBannerController)
uploadRouter.put('/banner-mobile-upload',auth,upload.single('image'),uploadMobileBannerController)
uploadRouter.get('/get-mobile-banner',getMObileBannerController)

export default uploadRouter