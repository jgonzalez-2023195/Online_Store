import { Router } from "express"
import { addCart } from './cart.controller.js'
import { validateTokenJWT } from '../../middlewares/validate.jwt.js'
import { isClient } from "../../middlewares/validate.jwt.js"
import { cart } from "../../middlewares/validators.js"

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

export default api