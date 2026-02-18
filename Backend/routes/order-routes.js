import {Router} from 'express'
import { auth } from '../middleware/auth-middleware.js'
import { CashOnDeliveryOrderController, getOrderDetails, markOrderAsSeenController, orderUpdateController, paymentController, webHookStripe } from '../controllers/orderController.js'

const orderRouter = Router()

orderRouter.post('/cash-on-delivery',auth,CashOnDeliveryOrderController)
orderRouter.post('/checkout',auth,paymentController)
orderRouter.post('/webhook',webHookStripe)
orderRouter.get('/order-list',auth,getOrderDetails)
orderRouter.put('/mark-seen/:orderId',markOrderAsSeenController)
orderRouter.put('/update/:orderId',auth,orderUpdateController)

export default orderRouter
