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
        address: {
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
        paymentMethod: {
            typePayment: {
                type: String,
                enum: ['CARD', 'APP', 'BANK', 'POINTS'],
                required: [true, 'Payment Method is required']
            },
            details: {
                cardType: {
                    type: String,
                    enum: ['DEBIT', 'CREDIT'],
                    required: function () {
                        return this.typePayment === 'CARD'
                    }
                },
                cardNumber: {
                    type: String,
                    required: function () {
                        return this.typePayment === 'CARD'
                    }
                },
                appName: {
                    type: String,
                    required: function () {
                        return this.typePayment === 'APP'
                    }
                },
                pointUsed: {
                    type: Number,
                    required: function() {
                        return this.typePayment === 'POINTS'
                    }
                }
            }
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Order', orderSchema)