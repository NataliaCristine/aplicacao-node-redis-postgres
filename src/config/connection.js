import knex from "knex";
import knexfile from "../../knexfile.js";
import { createClient } from 'redis';


export const connection = knex(knexfile)

export const get_transaction = async () => {
    return connection.transaction()
}



const host = 'redis'
const port = 6379


export const connectionRedis = () => {
    const connectionClientRedis = createClient({
            socket:{
                host,
                port
            }});
    
     connectionClientRedis.connect()

    return connectionClientRedis;

     
}


