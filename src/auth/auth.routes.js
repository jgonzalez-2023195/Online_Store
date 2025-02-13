import { Router } from "express"
import { login, register } from './auth.controller.js'
import { uploadProfilePicture } from '../../middlewares/multer.uploads.js'
import { registerUser } from '../../middlewares/validators.js'
import { deleteFileOnError } from '../../middlewares/delete.file.on.errors.js'

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
api.post('/login', login)

export default api