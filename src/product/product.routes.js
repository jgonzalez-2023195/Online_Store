import { Router } from "express"
import {
    deletedProduct,
    listProduct,
    listProducts,
    newProduct,
    updatedProduct
} from './product.controller.js'
import {
    registerProduct, 
    updateProduct 
} from '../../middlewares/validators.js'
import { deleteFileOnError } from '../../middlewares/delete.file.on.errors.js'
import { validateTokenJWT, isAdmin } from "../../middlewares/validate.jwt.js"
import { uploadProductPicture } from '../../middlewares/multer.uploads.js'

const api = Router()

api.post(
    '/new',
    [
        validateTokenJWT,
        isAdmin,
        uploadProductPicture.single('productPicture'),
        registerProduct,
        deleteFileOnError
    ],
    newProduct
)

api.get(
    '/list',
    [
        validateTokenJWT,
        isAdmin
    ],
    listProducts
)

api.get(
    '/list/:id',
    [
        validateTokenJWT,
        isAdmin
    ],
    listProduct
)

api.put(
    '/update/:id',
    [
        validateTokenJWT,
        isAdmin,
        uploadProductPicture.single('productPicture'),
        updateProduct,
        deleteFileOnError
    ],
    updatedProduct
)

api.delete(
    '/delete/:id',
    [
        validateTokenJWT,
        isAdmin
    ],
    deletedProduct
)

export default api