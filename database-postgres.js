import { randomUUID } from "node:crypto";
import { sql } from './db.js'

export class DataBasePostgres {

    async list(search) {

        let video;

        if (search) {
            video = await sql`select * from videos where name ilike ${'%' + search + '%'}`;
        } else {
            video = await sql`select * from videos`;
        }

        return video;
    }

    async create(video) {
        const id = randomUUID();
        const { name, description, duration } = video;

        console.log(name, description, duration);

        await sql`insert into videos
        (id,name,description,duration)
        VALUES(${id},${name},${description},${duration})`;
    }

    async update(id, video) {
        const { name, description, duration } = video;

        if (id) {
            await sql`update videos set 
        name=${name},
        description=${description},
        duration=${duration}
        where id=${id}; `;
        }
    }

    async delete(id) {
        if (id) await sql`delete from videos where id= ${id} `;
    }
}