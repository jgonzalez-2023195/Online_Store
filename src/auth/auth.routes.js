import { Router } from "express"
import { login, register } from './auth.controller.js'
import { uploadProfilePicture } from '../../middlewares/multer.uploads.js'
import { registerUser, registerUserAdmin } from '../../middlewares/validators.js'
import { deleteFileOnError } from '../../middlewares/delete.file.on.errors.js'
import { isAdmin, validateTokenJWT } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post(
    '/register', 
    [
        uploadProfilePicture.single("profilePicture"),
        registerUser,
        deleteFileOnError
    ],
    register
)

api.post(
    '/register/admin', 
    [
        validateTokenJWT,
        isAdmin,
        uploadProfilePicture.single("profilePicture"),
        registerUserAdmin,
        deleteFileOnError
    ],
    register
)
api.post('/login', login)

export default api