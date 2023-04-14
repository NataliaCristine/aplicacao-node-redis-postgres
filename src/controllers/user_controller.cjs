const repo = import('../services/users.services.js');


const get_users_all = (req,res) =>{
    const data = {
        token: req.headers.authorization
    }
    repo.then(repositorie_users => repositorie_users.UserServices.select_all_services(data).then(users => {
        res.send(users)
    }));
}

const post_user = (req,res) =>{

    const data = {
        name: req.body.name,
        email:req.body.email,
        token: req.headers.authorization
    }
    
    repo.then(repositorie_user => {
       repositorie_user.UserServices.create_user_services(data).then(user => {
           
           res.send(user)
       })
    });
    
   
}

const delete_users = (req,res) =>{
    const data = {
        token: req.headers.authorization
    }
    
    repo.then(repositorie_users => repositorie_users.UserServices.delete_all_services(data).then((user)=>{
        res.send({})
    }));
}

module.exports = {
    get_users_all,
    post_user,
    delete_users
}