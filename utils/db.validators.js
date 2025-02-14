import User from '../src/user/user.model.js'
import Category from '../src/categories/categories.model.js'
import parsePhoneNumber from "libphonenumber-js";
import mongoose, { isValidObjectId } from 'mongoose';

export const existEmail = async(email, user)=> {
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existUserName = async(username, user)=> {
    const alreadyUserName = await User.findOne({username})
    if(alreadyUserName && alreadyUserName._id != user.uid){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existCategory = async(name, category)=> {
    const alreadyCategory = await Category.findOne({name})
    if(alreadyCategory && alreadyCategory._id != category._id){
        console.error(`Category ${name}, is already taken`);
        throw new Error(`Category ${name}, is already taken`)
    }
}


//Otras validaciones para la bd
export const objectIdValid = async(objectid)=>{
    if(!isValidObjectId(objectid)) throw new Error(`Is not valid ObjectId`)
}

export const comonPasswords = async(password)=> {
    const comonPasswords = ['Password1234', 'Test1234', 'Prueba1234', 'Hola1234', 'Client1234', 'Admin1234', '12345678', 'asdfghjk', 'testtest']
    if(comonPasswords.includes(password)){
        throw new Error('Password is too common')
    }
    return true
}

export const formatPhoneNumber = (number) => {
    const phoneNumber = parsePhoneNumber(number, "GT")
    if (!phoneNumber || !phoneNumber.isValid()) {
        throw new Error("Invalid Guatemalan phone number.")
    }
    return phoneNumber.formatInternational()
}

// Validador para formato de precio
export const formatPrice = (value) => {
    const formatprice = parseFloat(value);
    if (isNaN(formatprice) || formatprice < 0) {
        throw new Error('Price must be a valid positive number');
    }
    return new mongoose.Types.Decimal128(formatprice.toFixed(2)); // Devuelve Decimal128
}

