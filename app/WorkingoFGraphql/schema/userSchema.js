const {gql} =require('apollo-server-express')


const typeDefs = gql`

 

type Users{
    id:ID
    firstName:String
    lastName:String
    email:String
    password:String
}

type Authuser{
    userId:ID
    firstName:String
    lastName:String
    email:String
    token:String
    tokenExpiration: Int!

}

type Forgot{
    email:String
    message:String
}

type Reset{
    email:String
    message:String
    newpassword:String
}



type Post{
    title:String
    description:String
}

type Label{
    labelname:String
}
 
input userInput{
    firstName:String
    lastName:String
    email:String
    password:String
} 

type GetLabels{
    _id:ID
    userId:String
    noteId:[String]
    labelName:String
}

input loginUser{
    email:String
    password:String
}
input forgotPassword{
    email:String
}

input resetPassword{
    email:String
    Code:String
    newpassword:String
}


input postInput{
    title:String
    description:String
}

input LabelInput{
    noteID:ID
    labelname:String
}

input deleteLabel{
    noteID:ID
    labelname:String
}

 

type Query {
    users:[Users]
    getAllnotes:[Post]
    getnotes(id:ID):Post
    getLabel:[GetLabels]
}

type Mutation{
    createuser(path:userInput):Users
    loginuser(path:loginUser):Authuser
    forgotpassword(path:forgotPassword):Forgot
    resetpassword(path:resetPassword):Reset
    
    createnote(post:postInput):Post
    deletenote(id:ID):String
    editnote(id:ID,post:postInput):Post

    createLabel(path:LabelInput):Label
    deleteLabel(path :deleteLabel ):Label
} 
`
module.exports = typeDefs;