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
        const productData = await Product.findById(product)
        if(!productData) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
        if(productData.stock < quantity) return res.status(423).send(
            {
                success: false,
                message: `Insufficient stock for ${productData.name}. Available: ${productData.stock}`
            }
        )
        //validar si ya existe el carrtio: 
        let cart = await Cart.findOne({userCart: req.user.uid})
        if(!cart){
            cart = new Cart(
                {
                    userCart: req.user.uid, 
                    products: [{product: product, quantity}],
                    totalPrice: (Number(productData.price) * quantity).toString()
                }
            )
        } else {
            // Si el carrito existe, actualizar productos
            const itemIndex = cart.products.findIndex(
              (item) => item.product.toString() === product
            );
            if (itemIndex > -1) {
              // Si el producto ya está, sumar la cantidad
              cart.products[itemIndex].quantity += quantity;
            } else {
              // Si no está, agregarlo
              cart.products.push({ product, quantity: Number(quantity) });
            }
            // Recalcular totalPrice
            const populatedCart = await cart.populate('products.product');
            cart.totalPrice = populatedCart.products.reduce(
                (total, item) => total + Number(item.product.price) * item.quantity,
                0
            );
          }
        await cart.save()
        return res.status(200).send(
            {
                success: true,
                message: 'Products added to cart'
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error with add CART',
                e
            }
        )
    }
}