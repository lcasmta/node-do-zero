import { sql } from './db.js'

// sql`drop table if exists videos`.then(() => {
//     console.log('table deleted');
// });

sql`
CREATE TABLE videos (
    id TEXT primary key,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    duration INTEGER NOT NULL
);
`.then(() => {
    console.log('done');
})