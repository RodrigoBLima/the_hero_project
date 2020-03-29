const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection')

module.exports = {

    async index(request, response) {
        const ongs = await connection('ongs').select('*')
        return response.json({ ongs })
    },

    async atualOng(request, response) {
        const { id } = request.params;
        // console.log(id)
        const ong = await connection('ongs')
        .select('*')
        .where('id', id)
        return response.json({ ong })
    },

    async update(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        // console.log(request.body)
        await connection('ongs').update({
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({
            name,
            email,
            whatsapp,
            city,
            uf
        });
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = generateUniqueId()

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({
            id
        });
    }
}
