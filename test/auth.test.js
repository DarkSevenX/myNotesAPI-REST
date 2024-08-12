import app from "../src/app";
import request from "supertest";
import { prisma } from "../src/db";

const testUsername = 'user_test'

afterAll(async () => {
  await prisma.user.deleteMany({
    where: { 
      username: testUsername
    }
  })
})

describe('Auth Routes', () => {

  test('POST /auth/register deberia registrar a un usuario', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username:'user_test',
        password:'123'
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveProperty('token')
  })

  test('POST /auth/login deberia autenticar el usuario', async () => {

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username:'user_test',
        password:'123'
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveProperty('token')

  })

})
