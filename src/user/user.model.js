import { Schema, model } from "mongoose"

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [30, `Can't be overcome 30 characters`]
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [30, `Can't be overcome 30 characters`]
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            minLength: [4, 'You must type at least 4 characters'],
            maxLength: [10, `Can't be overcome 10 characters`],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        mobilePhone: {
            type: String,
            required: [true, 'Mobile Phone is required']
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            upperCase: true,
            enum: ['ADMIN', 'CLIENT']
        },
        profilePicture: {
            type: String
        }
    }
)

export default model('User', userSchema)