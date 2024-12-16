import { Hono } from "hono";
import { login, register } from "../controller/auth.js";


const auth = new Hono()

auth.post("/login", login)
auth.post("/register", register)

export default auth