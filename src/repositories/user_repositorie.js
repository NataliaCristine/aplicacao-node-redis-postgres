
import {connection,connectionRedis} from "../config/connection.js";


class UserRepository {
  
  static createUser = async (data) => {
     
    const new_data = {
      id: data.id,
      name: data.name,
      email: data.email,
      client_id: data.client_id

    };
    
    const insert = connection("users")
      .returning(["id","name","email", "client_id"])
      .insert(new_data);
    
  
    
    const connection_redis = connectionRedis();
    
    await connection_redis.del(new_data.client_id)
    // await connection_redis.set(new_data.client_id, JSON.stringify(new_data))
    // await connection_redis.expire(new_data.client_id,60)

    return await insert;
  };

  static selectAll = async (client_id) => {

    const getAll = connection("users").where("client_id", "=", client_id);
    const connection_redis = connectionRedis();
 
    const getResponse = await connection_redis.get(client_id)
    
    if(!!getResponse) return JSON.parse(getResponse)

    const response =  await getAll
   
    await connection_redis.set(client_id, JSON.stringify(response))
    await connection_redis.expire(client_id,60)
    
    return  response 
  };

 
 
  static deleteAll = async (client_id) => {
    console.log(client_id)

    const deleteAll = connection("users").delete().where("client_id", "=", client_id);

    const connection_redis = connectionRedis();

    const deleteResponse = await connection_redis.del(client_id)

    await deleteAll

    return;
  };

  
}

export default UserRepository