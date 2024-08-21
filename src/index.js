import app from "./app.js"
import { swaggerDocs } from './routes/swagger.js'

const port = process.env.PORT || 8000
swaggerDocs(app,port)

app.listen(port, () => {
  console.log(`servidor corriendo en http://localhost:${port}`)
})
