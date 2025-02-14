import { Schema, model } from "mongoose"

const productSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            minLength: [2, 'Name must have at least 2 characters'],
            maxLength: [100, `Name cannot exceed 100 characters`]
        },
        description: {
            type: String,
            required: [true, 'Product description is required']
        },
        brand: {
            type: String,
            required: [true, 'Brand is required']
        },
        SKU: {
            type: String,
            required: [true, 'SKU is required'],
            minLength: [4, 'SKU must have at least 4 characters'],
            maxLength: [15, `SKU cannot exceed 15 characters`],
            unique: true
        },
        price: {
            type: Schema.Types.Decimal128,
            required: [true, 'Price is required']
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        status: {
            type: String,
            enum: ['AVAILABLE', 'NOT_AVAILABLE'],
            default: 'AVAILABLE'
        },
        productPicture: {
            type: String,
            default: null
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Product', productSchema)