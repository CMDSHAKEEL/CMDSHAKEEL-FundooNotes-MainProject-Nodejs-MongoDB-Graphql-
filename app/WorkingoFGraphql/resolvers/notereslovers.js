// importing files and packages

const Note          =  require('../../models/model.note')
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

        createnote: async(_,{post})=>{
             
            const notes = new Note({
                title: post.title,
                description: post.description,
                email: post.email,
            })
            const existingUser = await userModel.findOne({ email: post.email });
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
            const note = await Note.findByIdAndUpdate(id,{title,description},{new :true})
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