import fs from "fs"
import path from "path"
import { fileTypeFromBuffer } from "file-type";

export const uploadFile = async(c:any, next:any) => {
    try {
        console.log(await c.req.header("Content-type"))
        const {pictureFile, pictureName} = await c.req.parseBody()

        const file = await pictureFile.arrayBuffer()
        const buffer = Buffer.from(file)
        const fileType = await fileTypeFromBuffer(buffer);
    
        const fileName = `${pictureName}_${Date.now()}.${fileType?.ext}`
        const fileLocation = path.join("./public/", fileName)
 
        fs.createWriteStream(fileLocation).write(buffer)
     
        c.set("fileName", fileName)
        await next()
        return c.json("OK")
    }catch (error) {
        console.log(error)
        return c.json({message:"Have Some Error"},500)
    }
}