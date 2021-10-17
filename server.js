// importing files and packages

const express          =  require('express');
const { ApolloServer}  =  require('apollo-server-express')
const dbConfig         =  require('./DB.Config/database.config')
const Schema           =  require('././app/WorkingoFGraphql/schema/index')
const graphqlresolver  =  require('././app/WorkingoFGraphql/resolvers/index')

 

dbConfig.dbConnection();

async function startserver(){ 
     
const app = express()
  
//working of graphql 

const apolloserver = new ApolloServer({
    typeDefs:Schema,
    resolvers:graphqlresolver,
})
await apolloserver.start();
apolloserver.applyMiddleware({app , path:"/graphql"})

// listening to the port 

app.listen(2000,()=>{
    console.log("server is running 2000")})

}
 
startserver()
