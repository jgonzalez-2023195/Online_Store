import { Schema, model } from "mongoose"

const categorySchema= Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'Category name is required'],
            minLength: [4, `Password must be 4 characters`]
        },
        description: {
            type: String,
            required:  [true, 'Category description is required'],
            minLength: [5, 'Description must be 5 characters']
        },
        status: {
            type: String,
            required: [true, 'Category status is required'],
            enum: ['ACTIVE', 'INACTIVE'], default: 'INACTIVE'
        },
        parentCategory: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            default: null
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Category', categorySchema)