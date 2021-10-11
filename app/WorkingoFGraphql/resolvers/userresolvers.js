const userModel = require('../../models/usermodel')
const resolvers={
    Query:{
         
        users: async ()=>{
             return await userModel.find()

        } 
    },
    Mutation:{
        createuser:async (_,{args})=>{
            const {firstName,lastName,email,password} = path;
            const post = new userModel({firstName,lastName,email,password})
            await post.save()
            return post;
        }
    }
}
module.exports =resolvers