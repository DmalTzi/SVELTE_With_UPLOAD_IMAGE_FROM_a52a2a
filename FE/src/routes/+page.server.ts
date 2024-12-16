import { PRIVATE_URI } from "$env/static/private"
import { redirect } from "@sveltejs/kit"

export const load = async({cookies, request}:any) => {
    const token = cookies.get("token")

    // cookies.set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImRtYWx0aSIsImV4cCI6MTczNDMyNjk2MH0.BB_4_DuV0rhZ6gzUDvphOn2rnzf45OkdEW0ALXDrcSM", {path:"/"})
    if (!token)
        redirect(303, "/login")

    const res = await fetch(`${PRIVATE_URI}/picture`, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type":"apllication/json"
        }
    })

    const datas = await res.json()

    return {
        datas
    }
}

export const actions = {
    update: async ({cookies, request}: any) => {
        const token = `Bearer ${cookies.get("token")}`
        const data = await request.formData();
        const fileName = await data.get("fileName")
        const newFileName = await data.get("newFileName")
        const res = await fetch(`${PRIVATE_URI}/picture/${fileName}`, {
            method: "PUT",
            body: JSON.stringify({
                newFileName
            }),
            headers: {
                "Authorization" : token,
                "Content-Type":"apllication/json"
            }
        })
        const datas =  await res.json()
        console.log(datas)
    },

    delete: async ({cookies, request}: any) => {
        const token = `Bearer ${cookies.get("token")}`
        const data = await request.formData();
        const fileName = await data.get("fileName")
        const res = await fetch(`${PRIVATE_URI}/picture/${fileName}`, {
            method: "DELETE",
            headers: {
                "Authorization" : token,
                "Content-Type":"apllication/json"
            }
        })
        const datas =  await res.json()
        console.log(datas)
    }
}