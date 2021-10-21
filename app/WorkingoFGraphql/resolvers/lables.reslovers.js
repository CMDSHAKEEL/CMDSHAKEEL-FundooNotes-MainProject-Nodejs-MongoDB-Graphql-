 const labelModel = require('../../models/lable.model')
 const Apolloerror = require('apollo-server-errors')

 const labelResolvers = {

    Query:{
        getLabel : async () =>{
            const lables = await labelModel.find()
            return lables
        }
    },
    Mutation:{
        createLabel: async (_,{path}) =>{
            const checkNote = await labelModel.findOne({note: path.noteID})
            if(checkNote){
                return new Apolloerror.UserInputError('note is already exist ')
            }
            const labelmodel = new labelModel({
                userId: context.id,
                noteId: input.noteID,
                labelName: input.labelname,
            });

             
            await labelmodel.save();
            return ({
                labelname: path.labelname
            })
        }
    }

 }
 module.exports = labelResolvers;
