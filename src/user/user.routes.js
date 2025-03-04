import { Router } from "express"
import {
    updatUser,
    updatUserC
} from './user.controller.js'
import { uploadProfilePicture } from '../../middlewares/multer.uploads.js'
import { deleteFileOnError } from '../../middlewares/delete.file.on.errors.js'
import { isAdmin, isClient, validateTokenJWT } from "../../middlewares/validate.jwt.js"
import { updateUserAdmin, updateUserProfile } from "../../middlewares/validators.js"

const api = Router()

api.put(
    '/update/:id',
    [
        validateTokenJWT,
        isAdmin,
        updateUserAdmin,
        uploadProfilePicture.single('profilePicture'),
        deleteFileOnError
    ],
    updatUser
)
api.put(
    '/update/profile/:id',
    [
        validateTokenJWT,
        isClient,
        updateUserProfile,
        uploadProfilePicture.single('profilePicture'),
        deleteFileOnError
    ],
    updatUserC
)

export default api