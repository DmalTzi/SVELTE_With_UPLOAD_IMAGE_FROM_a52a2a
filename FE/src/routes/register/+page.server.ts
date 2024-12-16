import { PRIVATE_URI } from "$env/static/private"
import { redirect } from "@sveltejs/kit"

export const actions = {
    default: async({cookies, request}:any) => {
        const data = await request.formData()
        const userName = await data.get("userName")
        const password = await data.get("password")

        const res = await fetch(`${PRIVATE_URI}/register`, {
                method: "POST",
                body: JSON.stringify({
                    userName,
                    password
                }),
                headers: {
                    "Content-Type":"apllication/json"
                }
            }
        )

        if (res.status === 200) {
            throw redirect(303, "/login")
        }else {
            console.log("Some Problems")
            return {
                message : "Some Problem"
            }
        }
    }
}