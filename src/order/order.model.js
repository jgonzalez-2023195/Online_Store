import { Schema, model } from "mongoose"

const orderSchema = Schema(
    {
        client: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: [true, 'Quantity is requried']
                }
            }
        ],
        cart: {
            type: Schema.Types.ObjectId,
            ref: 'Cart',
            default: null
        },
        addres: {
            type: String,
            required: [true, 'Address is necesary']
        },
        totalPrice: {
            type: Schema.Types.Decimal128
        },
        deliveryMethod: {
            type: String,
            enum: ['HOME', 'PICKUP'],
            default: 'PICKUP'
        },
        statusOrder: {
            type: String,
            enum: ['CANCELED', 'PENDING', 'SHIPPED', 'DELIVERED'],
            default: 'PENDING'
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Order', orderSchema)