import { Router } from "express"
import { getOrder, getOrders, newOrder, updateOrder } from "./order.controller.js"
import { isAdmin, validateTokenJWT } from '../../middlewares/validate.jwt.js'
import { isClient } from "../../middlewares/validate.jwt.js"
import { registerOrder } from "../../middlewares/validators.js"

const api = Router()

api.post(
    '/new',
    [
        validateTokenJWT,
        isClient,
        registerOrder
    ],
    newOrder
)

api.get(
    '/list',
    [
        validateTokenJWT,
        isClient
    ],
    getOrder
)

api.get(
    '/orders/list',
    [
        validateTokenJWT,
        isAdmin
    ],
    getOrders
)

api.put(
    '/update/:id',
    [
        validateTokenJWT,
        isClient
    ],
    updateOrder
)

export default api