import { Router } from "express"
import {
    newCategory 
} from './categories.controller.js'
import { registerCategory } from '../../middlewares/validators.js'
import { deleteFileOnError } from '../../middlewares/delete.file.on.errors.js'
import { validateTokenJWT } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post('/new', 
    [
        registerCategory,
        validateTokenJWT,
        deleteFileOnError
    ],
    newCategory
)

export default api