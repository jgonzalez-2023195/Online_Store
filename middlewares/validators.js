import { body } from "express-validator"
import { validateErros } from './validate.errors.js'
import { comonPasswords, existCategory, existEmail, existUserName, formatPhoneNumber } from "../utils/db.validators.js"

export const registerUser = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .isLength({ max: 30 }).withMessage(`Can't be more than 30 characters`),
    body('surname', 'Surname cannot be empty')
        .notEmpty()
        .isLength({ max: 30 }).withMessage(`Can't be more than 30 characters`),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .isLength({ min: 4, max: 10 }).withMessage(`Username must be between 4 and 10 characters`)
        .custom(existUserName),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail().withMessage('Enter a valid Email')
        .custom(existEmail),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword(
            {
                minLength: 8,
                minLowercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                minUppercase: 1
            }
        )
        .isLength({ min: 8 }).withMessage(`The password must be at least 8 characters long`)
        .custom(comonPasswords),
    body('mobilePhone', 'Mobile phone cannot be empty')
        .notEmpty()
        .custom(formatPhoneNumber),
    body('role', 'Role cannot be empty')
        .optional()
        .notEmpty()
        .isIn(['ADMIN', 'CLIENT']).withMessage(`Role must be 'ADMIN' or 'CLIENT'`),
    validateErros
]

export const registerCategory = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .custom(existCategory),
    validateErros
]