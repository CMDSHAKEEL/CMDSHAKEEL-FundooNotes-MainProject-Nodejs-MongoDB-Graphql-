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
    _id:ID
    firstName:String
    lastName:String
    email:String
    token:String
    tokenExpiration: Int!

}

 
input userInput{
    firstName:String
    lastName:String
    email:String
    password:String
} 

input loginUser{
    email :String
    password:String
}

 

type Query {
    users:[Users]
}

type Mutation{
    createuser(path:userInput):Users
    loginuser(path:loginUser):Authuser
}
`
module.exports = typeDefs;