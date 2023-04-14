
import {get_transaction} from "../config/connection.js";
import jwt_decode from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import UserRepository from "../repositories/user_repositorie.js";


export  class UserServices {
    
    static create_user_services = async (data) => {
      const bearer_token = data.token.split(' ') || []
      const token = bearer_token
      const decoded_token = token[0] === 'Bearer' ? jwt_decode(token[1]) : [];
      
      const new_data = {
        id: uuidv4(),
        name: data.name,
        email: data.email,
        client_id: decoded_token.client_id ? decoded_token.client_id : null
  
      };
      

      const transaction = await get_transaction()
 
      try{
       
        const user = await UserRepository.createUser(new_data);
        await transaction.commit()
        return user
        
      }catch(err){

        console.log(err)
      }


      
    };
  
    static select_all_services = async (data) => {
      const bearer_token = data.token.split(' ') || []
      const token = bearer_token
      const decoded_token = token[0] === 'Bearer' ? jwt_decode(token[1]) : [];

  
      const users = await UserRepository.selectAll(decoded_token.client_id);

      return users
       

    };
  
   
   
    static delete_all_services = async (data) => {
      const bearer_token = data.token.split(' ') || []
      const token = bearer_token
      const decoded_token = token[0] === 'Bearer' ? jwt_decode(token[1]) : [];
      const users = await UserRepository.deleteAll(decoded_token.client_id);
      
      return users
    };
  
    
  }
  
  