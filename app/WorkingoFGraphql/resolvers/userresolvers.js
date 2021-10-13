
// importing files and packages

const userModel = require('../../models/usermodel')
const Apollerror = require('apollo-server-errors')
const joiValidation = require('../../utilities/Validation')
const  bcryptpass = require('../../utilities/bcrypt')
const bcrtpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendbymail = require('../../utilities/nodemailer')
const resolvers={

    //in Query we can get all data present in database

    Query:{
         
        users: async ()=>{
             return await userModel.find()

        }
        ,       
       // getAllPosts: async ()=>{
       //  return await Post.find()
        //  }   
    },

    //in Mutation we update and delete and insert data

    Mutation:{
        createuser:async (_,{path})=>{
          const user = new userModel({
              firstName:path.firstName,
              lastName:path.lastName,
              email:path.email,
              password:path.password
            })

            // implmentig regex pattern for input data

             const Validation = joiValidation.authRegister.validate(user._doc);
             if(Validation.error){
                 return new Apollerror.ValidationError(Validation.error)
             }

             //checking email should unique for creating new user

            const existinguser = await userModel.findOne({ email:path.email})
            if(existinguser){
                 return new Apollerror.UserInputError("Email exist already")
            }

            // using bcrypt for sequre password to be saved in database and using salt 

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

            //checking the password user password and saved password in DB
            const correct = await  bcrtpt.compare(path.password, userPresent.password);
            if (! correct) {
              return new Apollerror.AuthenticationError('wrong password' );
            }

            // Token generating

            const token =jwt.sign({  email:path.email  },' cmdshakeel123',{
                expiresIn:'1h'
            })
            return{ userId:userPresent.id,
                                firstName:userPresent.firstName,
                                             lastName:userPresent.lastName,
                                                                   token:token,
                                                                            tokenExpiration:1
                  }
        },

         forgotpassword: async(_,{path})=>{

             const checkinguser = await userModel.findOne({email:path.email});
             if(!checkinguser){
                 return new Apollerror.AuthenticationError('user not found .... ')
             }

             sendbymail.getMailMessage(checkinguser.email,(data)=>{
                 if(!data){
                     return new Apollerror.ApolloError('otp sending is failed')
                 }
             })
            return ({
                email:path.email,
            })
         },

         resetpassword: async(_,{path})=>{
            const checkinguser = await userModel.findOne({ email:path.email})
            if(!checkinguser){
                return new Apollerror.AuthenticationError('user id does not exist')
            }
            const checkingcode = sendbymail.passcode(path.code)
            if(checkingcode == 'false'){
                return new Apollerror.AuthenticationError('wrong code enter valid code')
            }
            bcryptpass.hash(path.newpassword,(data)=>{
                if(data){
                    checkinguser.password=data;
                    checkinguser.save()
                }else{
                    return 'error'
                }
            })
            return({
                email:path.email,
                newpassword:path.newpassword,
            })
         }
         
    }
}
module.exports =resolvers