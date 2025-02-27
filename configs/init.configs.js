import User from '../src/user/user.model.js'
import { encrypt } from '../utils/encrypt.validations.js'

export const initAdmin = async(req, res) => {
    try {
        const adminExists = await User.findOne({ role: 'ADMIN' });

        if (!adminExists) {
            console.log('Creating user with ADMIN role')

            let password = process.env.PASSWORD
            await encrypt(password)

            const adminUser = new User(
                {
                    name: 'José Francisco',
                    surname: 'González Ordoñez',
                    username: 'jgonzalezA',
                    email: 'jgonzalez-2023195@kinal.edu.gt',
                    password: password,
                    mobilePhone: '+502 4137-9293',
                    role: 'ADMIN'
                }
            )

            await adminUser.save()
            console.log('ADMIN user successfully created')
        } else {
            console.log('Default ADMIN already created')
        }
    } catch (e) {
        console.error('General error when register ADMIN to system', e)
    }
}