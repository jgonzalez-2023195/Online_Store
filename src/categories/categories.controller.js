import Category from './categories.model.js'
import User from '../user/user.model.js'

async function getUser(userId) {
    const user = await User.findById(userId)
    return user ? user.role : null
}

export const newCategory = async(req, res)=> {
    try {
        let data = req.body
        let logged = req.user.uid
        const role = await getUser(logged)
        if(role !== 'ADMIN') return res.status(403).send({message: 'Access denied: the user is not ADMIN'})
        let category = new Category(data)
        await category.save()
        return res.status(200).send(
            {
                succes: true,
                message: 'Category successfully added'
            }
        )
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