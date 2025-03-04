import { Router } from "express"
import {
    newOrder
} from './order.controller.js'
import { registerOrder } from '../../middlewares/validators.js'
import { validateTokenJWT, isClient } from "../../middlewares/validate.jwt.js"

export const api = Router()

import { newOrder } from "./order.controller.js"
import { validateTokenJWT } from '../../middlewares/validate.jwt.js'
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

export default api