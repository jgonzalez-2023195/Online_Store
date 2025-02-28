import Order from './order.model.js'
import Cart from '../cart/cart.model.js'
import Product from '../product/product.model.js'
import User from '../user/user.model.js'

export const newOrder = async(req, res) => {
    const {product, quantity, typePayment, details, cardType, carNumber, appName, pointUsed, ...data} = req.body
    try {
        const user = await User.findOne(
            {
                _id: req.user.uid
            }
        )
        if(!user) req.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        const productData = await Product.findById(product)
        if(!productData) return res.status(404).send(
            {
                success: false,
                message: 'Produc not found'
            }
        )
        const cartData = await Cart.findById(data.cart)
        if(!cartData) return res.status(404).send(
            {
                success: false,
                message: 'Cart not found'
            }
        )

        
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: true,
                message: 'General error with new order'
            }
        )
    }
}