import { redirect } from "@sveltejs/kit"

export const load = async({cookies}:any) => {

    const token = cookies.get("token")
    
    return {
        token : token !== undefined 
    }
}