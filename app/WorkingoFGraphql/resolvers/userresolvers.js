
// importing files and packages

const userModel     =  require('../../models/usermodel')
const Apollerror    =  require('apollo-server-errors')
const joiValidation =  require('../../utilities/Validation')
const bcryptpass    =  require('../../utilities/bcrypt')
const bcrtpt        =  require('bcrypt')
const jwt           =  require('jsonwebtoken')
const sendbymail    =  require('../../utilities/nodemailer') 
// const Note          =  require('../../models/model.note')

const resolvers={

    //in Query we can get all data present in database

    Query:{
         
        users: async ()=>{
             return await userModel.find()

        },
          
      //  getAllnotes: async ()=>{
        // return await Note.find()
     // }   
    },

    // in Mutation we update and delete and insert data

    Mutation:{

        // creating new user

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
                    console.log(data)
                }else{
                    throw error;
                }
                user.save();
            })
            return user;
 

        },

      // login user

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

            const token =jwt.sign({  email:path.email  },'cmdshakeel123',{
                expiresIn:'1h'
            })
            return{ userId:userPresent.id,
                                firstName:userPresent.firstName,
                                               lastName:userPresent.lastName,
                                                                       token:token,
                                                                             tokenExpiration:1
                  }
        },

        // implementing Forgot password

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
                message:'secret code is sent to your register mail id'
            })
         },

        // Reseting the password 
        
         resetpassword: async(_,{path})=>{
            const checkinguser = await userModel.findOne({ email:path.email})
            if(!checkinguser){
                return new Apollerror.AuthenticationError('user id does not exist')
            }
            const checkingcode = sendbymail.passcode(path.Code)
            if(checkingcode === 'false'){
                return new Apollerror.AuthenticationError('wrong code enter valid code')
            }
            bcryptpass.hash(path.newpassword,(error,data)=>{
                if(data){
                    checkinguser.password=data;
                    checkinguser.save();
                }else{
                    return 'error'
                }
            })
            return({
                email:path.email,
                newpassword:path.newpassword,
                message:' your new password is created'
            })
         },
          // creating notes

        //  createnote: async(_,{post})=>{
        //     const notes = new Note({
        //         title: post.title,
        //         description: post.description,
        //     })
        //     await notes.save();
        //     return notes

        //  },

        //  //updating notes

        //  updatenote: async(_,{post})=>{
        //     const notes ={
        //         id: post.id,
        //         title: post.title,
        //         description: post.description,
        //     }
        //      notes =await Note.findByIdAndUpdate({id:post.id})
        //      return notes
        //  }
         
    }
}
module.exports =resolvers