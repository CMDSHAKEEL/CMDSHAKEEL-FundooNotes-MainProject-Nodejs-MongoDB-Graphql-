const {gql} =require('apollo-server-express')

const typeDefs = gql`
type Users{
    id:ID
    firstName:String
    lastName:String
    email:String
    password:String
}

type Query {
     users:[Users]
}
input userInput{
    firstName:String
    lastName:String
    email:String
    password:String
} 

type Mutation{
    createuser(path:userInput):Users
}
`
module.exports = typeDefs;