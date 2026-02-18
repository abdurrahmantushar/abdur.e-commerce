import {Router} from 'express'
import { auth } from '../middleware/auth-middleware.js'
import { addTocutItemController, deleteCartItemController, getCartDetailsConroller, upgradCartItemsController } from '../controllers/cardController.js'

const cartRouter = Router()

cartRouter.post('/create',auth,addTocutItemController)
cartRouter.get('/get',auth,getCartDetailsConroller)
cartRouter.put('/update',auth,upgradCartItemsController)
cartRouter.delete('/delete/cart-item',auth,deleteCartItemController)

export default cartRouter