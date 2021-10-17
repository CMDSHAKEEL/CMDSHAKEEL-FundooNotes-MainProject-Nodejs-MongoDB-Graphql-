
const Note          =  require('../../models/model.note')

const notereslovers={

    Query:{

        getAllnotes: async ()=>{
            return await Note.find()
         },  

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

         //updating notes

         updatenote: async(_,{post})=>{
            const notes ={
                id: post.id,
                title: post.title,
                description: post.description,
            }
             notes =await Note.findByIdAndUpdate({id:post.id})
             return notes
         }
    }

}

module.exports = notereslovers;