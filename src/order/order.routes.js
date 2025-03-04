import { Router } from "express"
<<<<<<< HEAD
import {
    newOrder
} from './order.controller.js'
import { registerOrder } from '../../middlewares/validators.js'
import { validateTokenJWT, isClient } from "../../middlewares/validate.jwt.js"

export const api = Router()
=======
import { newOrder } from "./order.controller.js"
import { validateTokenJWT } from '../../middlewares/validate.jwt.js'
import { isClient } from "../../middlewares/validate.jwt.js"
import { registerOrder } from "../../middlewares/validators.js"

const api = Router()
>>>>>>> 2d8f7cc2adde3e00d3a6d8d2e8f4044a29fb1074

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