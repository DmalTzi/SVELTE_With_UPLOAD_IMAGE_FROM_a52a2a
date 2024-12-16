import { redirect } from "@sveltejs/kit"

export const load = async({cookies}:any) => {
    const token = await cookies.get("token")
    if (!token)
        throw redirect(303, "/login")
    await cookies.delete("token", {path:"/"})
    throw redirect(303, "/login")
}