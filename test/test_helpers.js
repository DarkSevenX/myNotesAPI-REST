
import request from "supertest";
import app from "../src/app";

// registra un usuario para testear y retorna el jwt
export async function getToken() {
  const response = await request(app)
    .post('/api/auth/register')
    .send({
      username:'test_user',
      password:'123'
    })

  return response.body.token
}

