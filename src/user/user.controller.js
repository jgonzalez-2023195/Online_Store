import User from './user.model.js'

export const update = async(req, res)=>{
    try{
        const { id } = req.params
 
        const data = req.body
 
        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
 
        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated',
                user: update
            }
        )
    }catch(e){
        console.error('General error', e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                e
            }
        )
    }
}

export const updateProfilePictur = async(req, res)=> {
    try {
        const { uid } = req.user
        const { filename } = req.file
        const user = await User.findByIdAndUpdate(
            uid,
            {
                profilePicture: filename
            },
            {new: true}
        )
        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found, user not update'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated succesfully',
                user
            }
        )
    } catch (e) {
        console.error('General error', e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                e
            }
        )
    }
}