import { body } from "express-validator"
import { validateErros } from './validate.errors.js'
import {
    comonPasswords, 
    existCategory, 
    existEmail, 
    existUserName, 
    formatPhoneNumber, 
    formatPrice, 
    objectIdValid 
} from "../utils/db.validators.js"

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
    body('role')
        .optional()
        .isIn(['CLIENT']).withMessage(`Role must be 'CLIENT'`),
    validateErros
]

export const registerUserAdmin = [
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

export const updateUserAdmin = [
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
        .isLength({ min: 4 }).withMessage(`The Name must be at least 4 characters long`)
        .custom(existCategory),
    body('description', 'Description cannot be empty')
        .optional()
        .notEmpty()
        .isLength({ min: 5 }).withMessage(`The Description must be at least 5 characters long`),
    body('status', 'Status cannot be empty')
        .optional()
        .notEmpty()
        .isIn(['ACTIVE', 'INACTIVE']).withMessage(`Status must be 'ACTIVE' or 'INACTIVE'`),
    body('parentCategory', 'Parent category cannot be empty')
        .optional()
        .notEmpty()
        .custom(objectIdValid),
    validateErros
]

export const updatedCategory = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .custom((name, { req })=> existCategory(name, req.category)),
    body('description', 'Description cannot be empty')
        .optional()
        .notEmpty(),
    body('status', 'Status cannot be empty')
        .optional()
        .notEmpty()
        .isIn(['ACTIVE', 'INACTIVE']).withMessage(`Status must be 'ACTIVE' or 'INACTIVE'`),
    body('parentCategory', 'Parent category cannot be empty')
        .optional()
        .notEmpty()
        .custom(objectIdValid),
    validateErros
]

export const registerProduct = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('description', 'Description cannot be empty')
        .notEmpty(),
    body('brand', 'Brand cannot be empty') // Corrección de typo
        .notEmpty(),
    body('SKU', 'SKU cannot be empty')
        .notEmpty()
        .isLength({ min: 4, max: 15 }).withMessage('SKU must be between 4 and 15 characters'),
    body('price', 'Price cannot be empty')
        .notEmpty()
        .isDecimal().withMessage('Price not valid')
        .custom(formatPrice),
    body('stock', 'Stock cannot be empty')
        .notEmpty()
        .isInt({ min: 0 }),
    body('category', 'Category cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('status', 'Status cannot be empty') 
        .optional() 
        .isIn(['AVAILABLE']).withMessage(`Status must be 'AVAILABLE'`),
    validateErros 
]

export const updateProduct = [
    body('name', 'Name cannot be empty')
        .optional()
        .notEmpty(),
        // .custom(), añadir unique ture a name
    body('description', 'Description cannot be empty')
        .optional()
        .notEmpty(),
    body('brand', 'Brand cannot be empty') 
        .optional()
        .notEmpty(),
    body('SKU', 'SKU cannot be empty')
        .optional()
        .notEmpty(),
    body('price', 'Price cannot be empty')
        .optional()
        .notEmpty()
        .isDecimal().withMessage('Price not valid')
        .custom(formatPrice),
    body('stock', 'Stock cannot be empty')
        .optional()
        .notEmpty()
        .isInt({ min: 0 }),
    body('category', 'Category cannot be empty')
        .optional()
        .notEmpty()
        .custom(objectIdValid),
    body('status', 'Status cannot be empty')
        .optional() 
        .optional() 
        .isIn(['AVAILABLE']).withMessage(`Status must be 'AVAILABLE'`),
    validateErros 
]

export const cart = [
    body("products.*.product")
        .exists()
        .withMessage("Product ID is required")
        .custom(objectIdValid)
        .withMessage("Product ID must be a valid MongoDB ObjectId"),
    body("products.*.quantity")
        .exists()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be an integer greater than or equal to 1"),
    validateErros,
]