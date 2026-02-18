import {Router} from 'express'
import { auth } from '../middleware/auth-middleware.js'
import { addressController, deleteAddressController, getAddressController, updateAddressController } from '../controllers/addressController.js'

const addressRouter = Router()

addressRouter.post('/create',auth,addressController)
addressRouter.get('/get-address',auth,getAddressController)
addressRouter.put('/update-address',auth,updateAddressController)
addressRouter.delete('/delete-address',auth,deleteAddressController)

export default addressRouter