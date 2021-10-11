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
 

        },
        loginuser:async(_,{path})=>{
            const login ={
                email:path.email,
                password:path.password
            }
            const userPresent = await userModel.findOne({ email: path.email });
            if (!userPresent) {
              return new ApolloError.AuthenticationError('Invalid Email id', { email: 'Not Found' });
            }

            return login;
        }
         
    }
}
module.exports =resolvers