import { Hono } from "hono";
import { createPicture, deletePicture, getPictures, updatePicture } from "../controller/content.js";
import { uploadFile } from "../middlewares/upload.js";
import { verifyToken } from "../middlewares/auth.js";


const content = new Hono()

content.use(verifyToken)

content.get("/picture", getPictures)

content.post("/picture", uploadFile ,createPicture)
content.delete("/picture/:fileName", deletePicture)
content.put("/picture/:fileName", updatePicture)

export default content;