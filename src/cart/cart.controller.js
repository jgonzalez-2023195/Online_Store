import Cart from './cart.model.js'
import User from '../user/user.model.js'
import Product from '../product/product.model.js'

export const addCart = async(req, res)=> {
    const {product, quantity} = req.body
    try {
        //Usuario
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
        //producto
        const products = await Product.findById(product)
        if(!products) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
        if(products.stock < quantity) return res.status(423).send(
            {
                success: false,
                message: `Insufficient stock for ${products.name}. Available: ${products.stock}`
            }
        )
        //validar si ya existe el carrtio: 
        const cart = await Cart.findOne({userCart: req.user.uid})
        if(!cart){
            cart = new Cart(
                {
                    userCart: req.user.uid, 
                    products: [{product: product, quantity}],
                    totalPrice: products.price * quantity
                }
            )
        }
        await cart.save()
        return res.status(200).send(
            {
                success: true,
                message: 'Products added to cart'
            }
        )
    } catch (e) {
        
    }
}