import Order from './order.model.js'
import Cart from '../cart/cart.model.js'
import Product from '../product/product.model.js'
import User from '../user/user.model.js'
import { cart } from '../../middlewares/validators.js'

export const newOrder = async(req, res) => {
    const {product, quantity, typePayment, details, cardType, cardNumber, appName, pointUsed, ...data} = req.body
    try {
        const user = await User.findOne(
            {
                _id: req.user.uid
            }
        )
        
        if(!user) return res.status(404).send(
        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )

        let orderProducts = []
        if(data.cart){
            //Verificar carrito
            const cartData = await Cart.findById(data.cart)
            const productDataCart = await Product.findById(cartData.product)
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
                orderProducts.push(
                    {
                        product: productData._id,
                        quantity: item.quantity
                    }
                )
            }
            // let newStock = productData.stock - cartData.quantity
            console.log(productDataCart);
            console.log(cartData.quantity); 
            
            data.totalPrice = cartData.totalPrice
            // await Product.findByIdAndUpdate(product, newStock)
            await Cart.findByIdAndUpdate(data.cart,
                {
                    products: [],
                    totalPrice: '0',
                }
            )
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
            orderProducts.push(
                {
                    product: productData._id,
                    quantity
                }
            )
            data.totalPrice = (Number(productData.price) * quantity).toString();
        }
        data.client = req.user.uid
        data.products = orderProducts
        
        const newOrder = new Order(data)
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