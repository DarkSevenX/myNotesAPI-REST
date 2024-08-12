import app from "../src/app";
import request from "supertest";
import { prisma } from "../src/db";
import { getToken } from "./test_helpers";

let token;
let note; //test note for get, delete and put

beforeAll(async () => {
  token = await getToken()
})

afterAll(async () => {
  await prisma.user.delete({
    where: {
      username:'test_user' 
    }
  })
})

describe('CRUD Notes Routes', () => {
  
  test('GET /notes deberia traer todas las notas de un usuario', async () => {
    const response = await request(app)
      .get('/api/notes')
      .set('token', token)
    
    expect(response.statusCode).toEqual(200)
    expect(response.body).toBeInstanceOf(Array)
  })


  test('POST /notes deberia crear una nueva nota', async () => {
    const response = await request(app)
      .post('/api/notes')
      .set('token', token)
      .send({
        title:'test Note',
        content:'esto es un test de creacion'
      })

    note = response.body

    expect(response.status).toEqual(200)
    expect(response.body).toBeInstanceOf(Object)
  })

  test('GET /notes/:id deberia traer solo una nota', async () => {
    const response = await request(app)
      .get(`/api/notes/${note.id}`)
      .set('token', token)
    
    expect(response.status).toEqual(200)
    expect(response.body).toBeInstanceOf(Object)
  })

  test('PATCH /notes/:id deberia editar una nueva nota', async () => {
    const response = await request(app)
      .patch(`/api/notes/${note.id}`)
      .set('token', token)
      .send({
        content: 'contenido editado'
      })

    expect(response.status).toEqual(200)
    expect(response.body).toBeInstanceOf(Object)
  })

  test('DELETE /notes/:id deberia eliminar la nota', async () => {
    const response = await request(app)
      .delete(`/api/notes/${note.id}`)
      .set('token', token)

    expect(response.status).toEqual(200)
  })
})
