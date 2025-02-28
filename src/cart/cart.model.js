import { Schema, model } from "mongoose"

const cartSchema = Schema(
    {
        userCart: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: [true, 'Product is required']
                },
                quantity: {
                    type: Number,
                    required: [true, 'Quantity is required']
                }
            }
        ],
        totalPrice: {
            type: Schema.Types.Decimal128,
            required: [true, 'Total Price is required']
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Cart', cartSchema)