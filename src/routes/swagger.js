
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'myNotes API',
      version: '1.0.0'
    },
  },
  apis: ['./src/routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

export const swaggerDocs = (app,port) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  console.log(`📄api docs disponibles en http://localhost:${port}/api/docs`)
}
