'use strict'

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from 'cors'
import authRoutes from '../src/auth/auth.routes.js'
import categoryRoutes from '../src/categories/categories.routes.js'
import productRoutes from '../src/product/product.routes.js'
import uploadProfile from '../src/user/user.routes.js'
import wathingInventroy from '../utils/inventoryWatcher.js'

const configs = (app)=> {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=> {
    app.use('/v1/onlinestore', authRoutes)
    app.use('/v1/onlinestore/Settings', uploadProfile)
    app.use('/v1/onlinestore/Category', categoryRoutes)
    app.use('/v1/onlinestore/Product', productRoutes)
}

export const initServer = ()=> {
    const app = express()
    try {
        configs(app)
        routes(app)
        wathingInventroy()
        app.listen(process.env.PORT)
        console.log(`Server running in port: ${process.env.PORT}`);
    } catch (e) {
        console.error('Server init failed: ', e);
    }
}