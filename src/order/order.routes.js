import { Router } from "express"
import {
    newOrder
} from './order.controller.js'
import { registerOrder } from '../../middlewares/validators.js'
import { validateTokenJWT, isClient } from "../../middlewares/validate.jwt.js"

export const api = Router()

api.post(
    '/new',
    [
        validateTokenJWT,
        isClient,
        registerOrder
    ],
    newOrder
)

export default api