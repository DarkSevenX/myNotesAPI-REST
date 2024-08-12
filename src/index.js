import app from "./app.js"
import { swaggerDocs } from './routes/swagger.js'

const port = process.env.PORT
swaggerDocs(app,port)

app.listen(port, () => {
  console.log(`servidor corriendo en http://localhost:${port}`)
})
