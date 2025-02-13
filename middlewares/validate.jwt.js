'use strict'

import jwt from 'jsonwebtoken'
// import User from '../src/user/user.model.js'

export const validateTokenJWT = async(req, res, next)=> {
    try {
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if(!authorization) return res.status(401).send({message: 'Unauthorized'})
        let user = jwt.verify(authorization, secretKey)
        req.user = user
        next()
    } catch (e) {
        console.error(e)
        return res.status(401).send(
            {
                message: 'Invalid credentials'
            }
        )
    }
}

//Mi version
/* async function getUser(userId) {
    const user = await User.findById(userId)
    return user ? user.role : null
}

export const verifyRoleADMIN = async(req, res, next)=> {
    try {
        let logged = req.user.uid
        const role = await getUser(logged)
        if(role !== 'ADMIN') return res.status(403).send(
            {
                succes: false,
                message: 'Access denied: the user is not ADMIN'
            }
        )
        next()
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                message: 'Error internal server',
                e
            }
        )
    }
} */


//Version del profe: 
export const isAdmin = async(req, res, next)=> {
    try {
        const { user } = req
        if(!user  || user.role != 'ADMIN') return res.status(403).send(
            {
                succes: false,
                message: `You dont have acces | username ${user.username}`
            }
        )
        next()
    } catch (e) {
        console.error(e);
        return res.status(403).send(
            {
                success: false,
                message: 'Error with authorization'
            }
        )
    }
}