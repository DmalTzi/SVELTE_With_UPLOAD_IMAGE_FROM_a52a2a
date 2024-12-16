import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import auth from './routes/authRoute.js'
import { cors } from 'hono/cors'
import content from './routes/contentRoute.js'
import { serveStatic } from '@hono/node-server/serve-static'


const app = new Hono()

app.use(logger())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use("/api/*", cors())
app.use('/assets/*', serveStatic({
  root: './',
  rewriteRequestPath: (path) => path.replace(/^\/assets/, '/public'),

}))


app.route("/api", auth)
app.route("/api", content)


const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
