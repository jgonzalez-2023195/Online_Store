import Category from './categories.model.js'


export const newCategory = async(req, res)=> {
    try {
        let data = req.body
        let category = new Category(data)
        if (category.parentCategory) {
            let parentCategory = await Category.findById(category.parentCategory);
            if (parentCategory && parentCategory.status === 'INACTIVE') {
                parentCategory.status = 'ACTIVE';
                await parentCategory.save();
            }
        }
        await category.save()
        return res.status(200).send(
            {
                succes: true,
                message: 'Category successfully added',
                category
            }
        )
    } catch (e) {
        console.error(e);
        res.status(500).send(
            {
                succes: false,
                message: 'General error when adding category',
                e
            }
        )
    }
}

export const listCategory = async( req, res ) =>{
    try {
        let category = await Category.find()
        .populate(
            {
                path: 'parentCategory',
                select: 'name description -_id'
            }
        )
        // .populate('parentCategory', 'name description')
        if(category.length === 0) return res.status(404).send({message: 'There are not categories registered in the system'})
            return res.status(200).send({message: 'The available categories are: ', category})
    } catch (e) {
        console.error(e);
        res.status(500).send(
            {
                succes: false,
                message: 'Internal server error',
                e
            }
        )
    }
}

export const updateCategory = async( req, res )=> {
    try {
        let id = req.params.id
        let data = req.body
        let updateCategory = await Category.findByIdAndUpdate(id, data, {new: true})
        if(!updateCategory) return res.status(404).send({message: 'Category not found, category not update'})
            return res.status(200).send({message: 'Category updated succesfully ', updateCategory})
    } catch (e) {
        console.error(e);
        res.status(500).send(
            {
                succes: false,
                message: 'Internal server error',
                e
            }
        )
    }
}

export const deleteCategory = async( req, res )=> {
    try {
        let id = req.params.id
        let deleteCategory = await Category.findByIdAndDelete(id)
        if(!deleteCategory) return res.status(404).send({message: 'Category not found, category not deleted'})
            return res.status(200).send({succes: true, message: 'Category has been successfully deleted'})
    } catch (e) {
        console.error(e);
        res.status(500).send(
            {
                succes: false,
                message: 'Internal server error',
                e
            }
        )
    }
}