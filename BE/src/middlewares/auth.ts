import { verify } from "hono/jwt";

export const verifyToken = async(c:any, next: any) => {
        const authHeader = c.req.header("Authorization");
        if (authHeader.search("Bearer ") == -1){
                return c.json({message: "Authorization Must Bearer"}, 403)
        }
        if (!authHeader) return c.json({ message: "Access Denied" },403);
        const token = authHeader && authHeader.split(" ")[1];

        const decodePayload = await verify(token, process.env.SECRET_KEY!)
        c.set("payload",decodePayload)
        await next()
}