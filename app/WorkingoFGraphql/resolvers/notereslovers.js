// importing files and packages

const noteModel        =  require('../../models/model.note')

const userModel     = require('../../models/usermodel')

const notereslovers={

    Query:{

        // for getting all notes present in Database 

        getAllnotes: async ()=>{
            return await Note.find()
         },  

         //  Retrieving a single Note BY ID

         getnotes: async(_,{id})=>{
            return await Note.findById(id);
       }

    },

    Mutation:{
        // creating notes

        createnote: async(_,{post},context)=>{

               const existingUser = await userModel.findOne({ email: context.email }); 
            const notes =  new noteModel({
                title: post.title,
                description: post.description,
                emailid: post.email,
            })
                
  
            if(existingUser){
                return 'user id already EXIST'
            }
            await notes.save();
            return notes
 
         },

         // Editing Notes By Id 

         editnote: async(parent,args,context,info)=>{

             const {id} =args

            const {title, description} =args.post

            const note = await noteModel.findByIdAndUpdate(id,{title,description},{new :true})

            return note
         },

         // Deleting Notes by ID  

        deletenote: async(parent,args,context,info)=>{

        const { id } = args

        await Note.findByIdAndDelete(id)

        return 'ok  your notes deleted successfully'

        }
        
    }

 }

module.exports = notereslovers;