import { Router } from "express"
import {
    updatUser
} from './user.controller.js'
import { uploadProfilePicture } from '../../middlewares/multer.uploads.js'
import { deleteFileOnError } from '../../middlewares/delete.file.on.errors.js'
import { isAdmin, validateTokenJWT } from "../../middlewares/validate.jwt.js"
import { updateUserAdmin } from "../../middlewares/validators.js"

const api = Router()

api.put(
    '/update/profilePicture/:id',
    [
        validateTokenJWT,
        isAdmin,
        updateUserAdmin,
        uploadProfilePicture.single('profilePicture'),
        deleteFileOnError
    ],
    updatUser
)

export default api