import express from 'express'
import morgan from 'morgan'
import noteRouter from './routes/noteRoutes.js'
import autRouter from './routes/authRoutes.js'

const app = express()
// cambio en branch desarrollo
app.use(express.json())
app.use(express.urlencoded({extended: false}))

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.use('/api/notes', noteRouter)
app.use('/api/auth', autRouter)

export default app
