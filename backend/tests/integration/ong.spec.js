const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ong', () => {

    beforeEach(async () => {
        await connection.migrate.rollbackit()
        await connection.migrate.latest()     //EXECUTE MIGRATIONS FOR THE TEST
    });

    afterAll(async ()=>{
        await connection.destroy() // DESTROY CONNECTION AFTER RUN ALL TESTS
    })

    it('should be able to create a new ong', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "teste",
                email: "email@email.com",
                whatsapp: "11188475865",
                city: "rio de janeiro",
                uf: "rj",
            })
            console.log(response.body)
            expect(response.body).toHaveProperty('id')
            expect(response.body.id).toHaveLength(8)
    })
})
