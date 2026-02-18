import {Router} from 'express';
import { auth } from '../middleware/auth-middleware.js';
import { AddSubCategoryController, deleteSubCategoryController, editSubCategoryController, getSubCategoryController } from '../controllers/subCategoryController.js';

const subCategoryRouter = Router()

subCategoryRouter.post('/create',auth,AddSubCategoryController)
subCategoryRouter.get('/get',getSubCategoryController)
subCategoryRouter.put ('/update',auth,editSubCategoryController)
subCategoryRouter.delete('/delete',auth,deleteSubCategoryController)

export default subCategoryRouter