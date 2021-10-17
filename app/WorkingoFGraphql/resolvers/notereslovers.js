
const Note          =  require('../../models/model.note')

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
            })
            await notes.save();
            return notes

         },
         

         // Editing  notes by ID

         editnote: async(args)=>{
             const { id } = args
             const {title,description} =args.post
             const note = await Note.findByIdAndUpdate(id,{title,description})
             return note
             console.log(" Post is Successfully Edited")
         }
        
    }

}

module.exports = notereslovers;