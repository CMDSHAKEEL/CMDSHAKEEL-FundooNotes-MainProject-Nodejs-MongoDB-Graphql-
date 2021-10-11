const userModel = require('../../models/usermodel')
const Apollerror = require('apollo-server-errors')
const joiValidation = require('../../utilities/Validation')
const resolvers={
    Query:{
         
        users: async ()=>{
             return await userModel.find()

        } 
    },
    Mutation:{
        createuser:async (_,{path})=>{
           // const {firstName,lastName,email,password} = path;
            //const post = new userModel({firstName,lastName,email,password})
           // await post.save()
          //  return post;
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
              user.save();
            return user;
 

        }
         
    }
}
module.exports =resolvers