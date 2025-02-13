import { Router } from "express"
import {
    updateProfilePictur
} from './user.controller.js'
import { uploadProfilePicture } from '../../middlewares/multer.uploads.js'
import { deleteFileOnError } from '../../middlewares/delete.file.on.errors.js'
import { validateTokenJWT } from "../../middlewares/validate.jwt.js"

const api = Router()

api.put(
    '/update/profilePicture/:id',
    [
        validateTokenJWT,
        uploadProfilePicture.single("profilePicture"),
        deleteFileOnError
    ],
    updateProfilePictur
)

export default api