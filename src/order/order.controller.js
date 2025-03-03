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
        
        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )

        let orderProduct = []
        let totalPrice = 0
        console.log(data.address);
        console.log('Body Completo:', req.body);
console.log('Address:', req.body.address);

        
        if(data.cart){
            //Verificar carrito
            const cartData = await Cart.findById(data.cart)
            if(!cartData) return res.status(404).send(
                {
                    success: false,
                    message: 'Cart not found'
                }
            )
            if(cartData.products.length === 0) return res.status(400).send(
                {
                    success: false,
                    message: 'Cart is empty'
                }
            )

            for(const item of cartData.products){
                const productData = item.product
                if(productData.stock < item.quantity) return res.status(400).send(
                    {
                        success: false,
                        message: `Insufficient stock for ${productData.name}. Available: ${productData.stock}`
                    }
                )
                orderProduct.push(
                    {
                        product: productData._id,
                        quantity: item.quantity
                    }
                )
            }
            totalPrice = cartData.totalPrice
        } else {
            const productData = await Product.findById(product)
            if(!productData) return res.status(404).send(
                {
                    success: false,
                    message: 'Produc not found'
                }
            )
            if(productData.stock < quantity) return res.status(400).send(
                {
                    success: false,
                    message: `Insufficient stock for ${productData.name}. Available: ${productData.stock}`
                }
            )
            orderProduct.push(
                {
                    product: productData._id,
                    quantity,
                }
            )
            totalPrice = (Number(productData.price) * quantity).toString();
        }
        const newOrder = new Order(
            {
                client: req.user.uid,
                data
            }
        )
        await newOrder.save()
        return res.status(201).send(
            {
                success: true,
                message: 'Order created',
                newOrder
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: true,
                message: 'General error with new order',
                e
            }
        )
    }
}