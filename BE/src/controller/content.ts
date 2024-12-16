import { usersTable } from "../db/schema.js"
import db from "../database.js"
import { cosineDistance, eq } from "drizzle-orm"
import path from "path"
import fs from "fs"

export const getPictures = async(c: any) => {
    const {userName} = await c.get("payload")
    const imagePath = await db
                                .selectDistinct({imagePath:usersTable.imagePath})
                                .from(usersTable).
                                where(eq(usersTable.user_name, userName))
    const imagePaths = imagePath[0].imagePath?.split("|")
    
    if (imagePaths![0] == "") {
        imagePaths?.pop()
    }

    return c.json(imagePaths,200)
}

export const createPicture = async(c: any) => {
    const fileName = await c.get("fileName")
    const {userName} = await c.get("payload")
    // console.log(fileName)

    const imagePath = await db
                                .selectDistinct({imagePath:usersTable.imagePath})
                                .from(usersTable).
                                where(eq(usersTable.user_name, userName))
                                

    let border = "|"
    if(!imagePath[0].imagePath?.length)
        border = ""

    imagePath[0].imagePath += border + fileName

    await db.update(usersTable).set({
        imagePath: imagePath[0].imagePath
    })

    return c.json("OK")
}

export const deletePicture = async(c: any) => {
    const fileName = c.req.param("fileName")
    const {userName} = await c.get("payload")
    const imagePath = await db
                                .selectDistinct({imagePath:usersTable.imagePath})
                                .from(usersTable).
                                where(eq(usersTable.user_name, userName))
               
    const imagePaths = imagePath[0].imagePath?.split("|")

    const index = imagePaths?.indexOf(fileName)!

    if (index == -1 || imagePath?.length! <= 0) {
        return c.json({"message":"Not Found"}, 404)
    }

    const filePath = path.join(`./public/${imagePaths![index]}`)
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err)
            return c.json({"message":"Cannot remove this file"}, 500)
        }
        console.log(fileName+"has deleted")
    })

    imagePaths?.splice(index, 1)

    await db.update(usersTable).set({
        imagePath: imagePaths?.join("|") 
    })

    return c.json("OK")
}

export const updatePicture = async(c:any) => {
    const fileName = c.req.param("fileName")
    const {userName} = await c.get("payload")
    const {newFileName} = await c.req.json()

    const imagePath = await db
                                .selectDistinct({imagePath:usersTable.imagePath})
                                .from(usersTable).
                                where(eq(usersTable.user_name, userName))
    console.log(imagePath)
               
    const imagePaths = imagePath[0].imagePath?.split("|")

    const index = imagePaths?.indexOf(fileName)!

    if (index == -1 || imagePath?.length! <= 0) {
        return c.json({"message":"Not Found"}, 404)
    }

    const newName = `${newFileName}_${imagePaths![index].split("_")[1]}`
    const filePath = path.join(`./public/${imagePaths![index]}`)
    const newFilePath = path.join(`./public/${newName}`)
    fs.rename(filePath, newFilePath, (err) => {
        if (err) {
            console.log(err)
            return c.json({"message":"Cannot rename this file"}, 500)
        }
        console.log(`+++from ${filePath} to ${newFileName}+++`)
    })

    imagePaths![index] = newName

    await db.update(usersTable).set({
        imagePath: imagePaths?.join("|") 
    })

    return c.json("OK",200)
}