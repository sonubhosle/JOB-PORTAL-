const JWT_PROVIDER = require('../Config/JWT')

const User_Service = require('../Services/User_Service')

const authenticate = async (req,res,next) =>{

    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).send({ message: 'Token Not Found' });
        }


        const userId = JWT_PROVIDER.getUserIdFromToken(token);

        const user = await User_Service.Find_User_By_Id(userId); 

        req.user = user ;
        
    } catch (error) {


        return res.status(500).send({error:error.message})
        
    }
    next();

}


module.exports = authenticate