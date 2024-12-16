import { PRIVATE_URI } from "$env/static/private"
import { redirect } from "@sveltejs/kit"

export const actions = {
    default: async({cookies, request}:any) => {
        const token = `Bearer ${cookies.get("token")}`
        const data = await request.formData()
        const pictureName = await data.get("pictureName")

        const formData = new FormData()
        const file = await data.get("file")
        
        formData.set("pictureFile", file)
        formData.set("pictureName", pictureName)
        console.log(typeof formData)

        const res = await fetch(`${PRIVATE_URI}/picture`, {
                method: "POST",
                headers: {
                    "Authorization" : token,
                },
                body:formData
            }
        )

        if (res.status === 200) {
            return {
                message : "image has uploaded"
            }
        }else {
            console.log("Some Problems")
            return {
                message : "Some Problem"
            }
        }
    }
}