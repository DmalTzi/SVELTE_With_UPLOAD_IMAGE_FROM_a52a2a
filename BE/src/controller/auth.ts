import { eq } from "drizzle-orm"
import db from "../database.js"
import { usersTable } from "../db/schema.js"
import bcrypt from "bcrypt"
import { sign } from "hono/jwt"

export const login = async(c:any) => {
    const body = await c.req.json()
    const {userName, password} = body
    const userExist = await db.
                                selectDistinct({email : usersTable.user_name, password: usersTable.password})
                                .from(usersTable)
                                .where(eq(usersTable.user_name, userName))
                                .limit(1)

    if(!userExist.length)
        return c.json({"message":"Username or Password not match!"}, 401)

    const compare = await bcrypt.compare(password, userExist[0].password)
    
    if(!compare) 
        return c.json({"message": "Username or Password not match!"}, 401)

    const token = await sign({
        userName,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12
    }, process.env.SECRET_KEY!)

    return c.json({"message":"login successful",token}, 200)
}

export const register = async(c:any) => {
    const body = await c.req.json()
    const {userName, password} = body
    const userExist = await db
                                .select()
                                .from(usersTable)
                                .where(eq(usersTable.user_name, userName))

    if(userExist.length)
        return c.json({"message":"This username is already take!!"}, 400)

    const hashPassword = await bcrypt.hash(password, 1)

    await db.insert(usersTable).values({user_name:userName, password:hashPassword})
    return c.json({"message": "Register successfull"},200)
}