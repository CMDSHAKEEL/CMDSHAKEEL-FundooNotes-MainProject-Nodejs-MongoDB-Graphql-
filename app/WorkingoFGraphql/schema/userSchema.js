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
}

type Reset{
    email:String
}
 
input userInput{
    firstName:String
    lastName:String
    email:String
    password:String
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
    code:String!
    newpassword:String
}

 

type Query {
    users:[Users]
}

type Mutation{
    createuser(path:userInput):Users
    loginuser(path:loginUser):Authuser
    forgotpassword(path:forgotPassword):Forgot
    resetpassword(path:resetPassword):Reset
}
`
module.exports = typeDefs;