import { Router } from "express"
import { addCart, removeCart } from './cart.controller.js'
import { validateTokenJWT } from '../../middlewares/validate.jwt.js'
import { isClient } from "../../middlewares/validate.jwt.js"
import { cart, deletedProductCart } from "../../middlewares/validators.js"

const api = Router()

api.post(
    '/added',
    [
        validateTokenJWT,
        isClient,
        cart
    ],
    addCart
)

api.post(
    '/removed',
    [
        validateTokenJWT,
        isClient,
        deletedProductCart
    ],
    removeCart
)

export default api