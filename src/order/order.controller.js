import Order from './order.model.js'
import Cart from '../cart/cart.model.js'
import Product from '../product/product.model.js'
import User from '../user/user.model.js'

export const newOrder = async(req, res) => {
    const {product, quantity, ...data} = req.body
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
                const productData = await Product.findById(item.product)
                if(productData.stock < item.quantity) return res.status(400).send(
                    {
                        success: false,
                        message: `Insufficient stock for ${productData.name}. Available: ${productData.stock}`
                    }
                )
                let quantityToBuy = item.quantity
                productData.stock -= quantityToBuy
                await productData.save()
                orderProducts.push(
                    {
                        product: productData._id,
                        quantity: quantityToBuy
                    }
                )
            }
            data.totalPrice = cartData.totalPrice
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

export const getOrder = async(req, res)=> {
    const {limit, skip} = req.query
    try {
        const order = await Order.find({ client: req.user.uid }).limit(limit).skip(skip).populate(
            [
                {
                    path: 'client',
                    select: 'name surname email mobilePhone -_id'
                },
                {
                    path: 'products.product',
                    select: 'name price -_id'
                }
            ]
        )

        if(!order) return res.status(404).send(
            {
                success: false,
                message: 'Order not found'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Order: ',
                order
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error with get order',
                e
            }
        )
        
    }
}

export const getOrders = async(req, res)=> {
    const {limit, skip} = req.query
    try {
        const order = await Order.find().limit(limit).skip(skip).populate(
            [
                {
                    path: 'client',
                    select: 'name surname email mobilePhone -_id'
                },
                {
                    path: 'products.product',
                    select: 'name price -_id'
                }
            ]
        )

        if(!order) return res.status(404).send(
            {
                success: false,
                message: 'Order not found'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Orders: ',
                order
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error with get order',
                e
            }
        )
        
    }
}

export const updateOrder = async (req, res) => {
    const {newQuantity } = req.body
    const id = req.params.id
    try {
        const order = await Order.findById(id);
        if (!order) return res.status(404).send(
            { 
                success: false, 
                message: 'Order not found' 
            }
        )
        const productData = await Product.findById(order.products[0].product);
        if (!productData) return res.status(404).send({ success: false, message: 'Product not found' });

        const previousQuantity = order.products[0].quantity;

        if (newQuantity > previousQuantity) {
            const difference = newQuantity - previousQuantity;
            if (productData.stock < difference) {
                return res.status(400).send({ success: false, message: 'Not enough stock available' });
            }
            productData.stock -= difference
        } else if (newQuantity < previousQuantity) {
            const difference = previousQuantity - newQuantity;
            productData.stock += difference
        }

        await productData.save();
        order.products[0].quantity = newQuantity;
        await order.save();
        return res.status(200).send(
            { 
                success: true, 
                message: 'Order updated successfully', 
                order 
            }
        )
    } catch (error) {
        console.error(error);
        return res.status(500).send(
            { 
                success: false, 
                message: 'Error updating order', 
                error 
            }
        )
    }
}