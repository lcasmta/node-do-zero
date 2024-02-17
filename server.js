// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('oi');

//     return response.end();
// })

// server.listen(3333);

import { fastify } from 'fastify';
import { DataBasePostgres } from './database-postgres.js';

const server = fastify();

const database = new DataBasePostgres();

server.get('/videos', async (request) => {

    const search = request.query.search;

    const video = await database.list(search);

    return video;
});



server.post('/videos', async (request, reply) => {

    const { name, description, duration } = request.body;

    await database.create({
        name, description, duration
    });

    return reply.status(201).send();
});



server.put('/videos/:id', async (request, reply) => {
    const id = request.params.id;
    const { name, description, duration } = request.body

    if (id) {
        const video = await database.update(id, {
            name, description, duration
        })

        return reply.status(204).send();

    } else return reply.status(404).send();

});



server.delete('/:id', async (request, reply) => {
    const id = request.params.id;

    if (id != '') await database.delete(id);

    return reply.status(204).send();
});

// Listen

server.listen({ host: '0.0.0.0', port: process.env.PORT ?? 3333 });