const userModel = require('../../models/usermodel')
const Apollerror = require('apollo-server-errors')
const joiValidation = require('../../utilities/Validation')
const  bcryptpass = require('../../utilities/bcrypt')
const bcrtpt = require('bcrypt')
const jwt = require('jsonwebtoken')

const resolvers={
    Query:{
         
        users: async ()=>{
             return await userModel.find()

        } 
    },
    Mutation:{
        createuser:async (_,{path})=>{
          const user = new userModel({
              firstName:path.firstName,
              lastName:path.lastName,
              email:path.email,
              password:path.password
            })
             const Validation = joiValidation.authRegister.validate(user._doc);
             if(Validation.error){
                 return new Apollerror.ValidationError(Validation.error)
             }
            const existinguser = await userModel.findOne({ email:path.email})
            if(existinguser){
                 return new Apollerror.UserInputError("Email exist already")
            }
            bcryptpass.hash(path.password, (error,data)=>{
                if(data){
                    user.password = data
                    //console.log(data)
                }else{
                    throw error;
                }
                user.save();
            })
            return user;
 

        },
        loginuser:async(_,{path})=>{
            const login ={
                email:path.email,
                password:path.password
            }
            const Validationlogin = joiValidation.authLogin.validate(login);
            if(Validationlogin.error){
                return new Apollerror.ValidationError(Validationlogin.error)
            }
            const userPresent = await userModel.findOne({ email: path.email });
            if (!userPresent) {
              return new Apollerror.AuthenticationError('Invalid Email id Enter Valid id .....');
            }
            const correct = await  bcrtpt.compare(path.password, userPresent.password);
            if (! correct) {
              return new Apollerror.AuthenticationError('wrong password' );
            }
            const token =jwt.sign({userId:path.id, email:path.email },'supersecretkey',{
                expiresIn:'1h'
            })
            return{ userId:userPresent.id, token:token,tokenExpiration:1 }
        }
         
    }
}
module.exports =resolvers