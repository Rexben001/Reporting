import users from '../models/db';

class UserControllers{
    
    static getUsers(req, res){
        return res.json ({
            users 
        });
    }
}

export default UserControllers;
