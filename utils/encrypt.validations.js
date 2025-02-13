'use strict'

import { hash, verify } from "argon2"

export const encrypt = async(passwrod)=> {
    try {
        return await hash(passwrod)
    } catch (e) {
        console.error(e);
        return e
    }
}

export const checkPassword = async(hash, passwrod)=> {
    try {
        return await verify(hash, passwrod)
    } catch (e) {
        console.error(e);
        return e
    }
}