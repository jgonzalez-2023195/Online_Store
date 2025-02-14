import Product from './product.model.js'
import Category from '../categories/categories.model.js'

export const newProduct = async(req, res)=> {
    const data = req.body
    if (data.price) {
        data.price = parseFloat(data.price).toFixed(2);  // Asegura que el precio tenga 2 decimales
    }
    try {
        let product = new Product(data)
        product.productPicture = req.file?.filename?? null
        await product.save()
        const catId = product.category
        let category = await Category.findById(catId)
        if(category && category.status === 'INACTIVE'){
            category.status = 'ACTIVE'
            await category.save()
        }
        return res.status(200).send(
            {
                succes: true,
                message: 'New product successfully added',
                product
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                succes: false,
                message: 'General error when adding product',
                e
            }
        )
    }
}

export const listProduct = async(req, res)=> {
    try {
        let { id } = req.params
        let product = await Product.findById(id).populate(
            {
                path: 'category',
                select: 'name description -_id'
            }
        )
        if(!product) return res.status(404).send({message: 'There are not products registered in the system'})
            return res.status(200).send({message: 'The available products are: ', product})
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                succes: false,
                message: 'General error when list product',
                e
            }
        )
    }
}

export const listProducts = async(req, res)=> {
    const {limit, skip} = req.query
    try {
        let product = await Product.find().skip(skip).limit(limit).populate(
            {
                path: 'category',
                select: 'name description -_id'
            }
        )
        if(product.length === 0) return res.status(404).send({message: 'There are not products registered in the system'})
            return res.status(200).send({message: 'The available products are: ',total: product.length , product})
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                succes: false,
                message: 'General error when list product',
                e
            }
        )
    }
}

export const updatedProduct = async(req, res)=> {
    try {
        const { id } = req.params
        const { filename } = req.file
        const data = req.body

        if (filename) {
            data.productPicture = filename;
        }

        const product = await Product.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!product) return res.status(404).send(
            {
                success: false,
                message: 'Product not foun, product not update'
            }
        )
        return res.status(200).send(
            {
                succes: true,
                message: 'Produc updated: ',
                product
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                succes: false,
                message: 'General error when updated product',
                e
            }
        )
    }
}

export const deletedProduct = async(req, res)=> {
    try {
        let id = req.params.id
        let product = await Product.findByIdAndDelete(id)
        if(!product) return res.status(404).send(
            {
                succes: false,
                message: 'Product not foun, product not deleted'
            }
        )
        return res.status(200).send(
            {
                succes: true,
                message: 'Product deleted to system',
                product
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                succes: false,
                message: 'General error when updated product',
                e
            }
        )
    }
}