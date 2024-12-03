import { app } from 'config/express.config'
import request from 'supertest'

describe('POST /api/v1/users/register', () => {
    it('should create a new user', async () => {
        const response = await request(app).post('/api/v1/auth/register').send({
            userName: 'John Doe',
            password: 'password123'
        })
        expect(response.statusCode).toBe(201)
    })

    it('should return a 404 error for invalid data', async () => {
        // Assertions for invalid data response
        const response = await request(app).post('/api/v1/auth/register').send({
            userName: 'John Doe'
        })
        expect(response.statusCode).toBe(400)
    })
})