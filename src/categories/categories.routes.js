import { Router } from "express"
import {
    newCategory,
    listCategory,
    updateCategory,
    deleteCategory
} from './categories.controller.js'
import { registerCategory, updatedCategory } from '../../middlewares/validators.js'
import { deleteFileOnError } from '../../middlewares/delete.file.on.errors.js'
import { validateTokenJWT, isAdmin } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post(
    '/new', 
    [
        registerCategory,
        validateTokenJWT,
        isAdmin,
        deleteFileOnError
    ],
    newCategory
)
api.get(
    '/list', 
    [
        validateTokenJWT, 
        isAdmin
    ], 
    listCategory
)
api.put(
    '/update/:id',
    [   
        updatedCategory,
        validateTokenJWT,
        isAdmin,
        deleteFileOnError
    ],
    updateCategory
)
api.delete(
    '/delete/:id',
    [
        validateTokenJWT,
        isAdmin
    ],
    deleteCategory
)

export default api