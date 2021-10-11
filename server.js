const express = require('express');
const { ApolloServer, gql} = require('apollo-server-express')
const dbConfig =  require('./DB.Config/database.config')
const Schema = require('././app/WorkingoFGraphql/schema/index')
const graphqlresolver =require('././app/WorkingoFGraphql/resolvers/index')
require('dotenv').config();

dbConfig.dbConnection();
async function startserver(){
const app = express()
const apolloserver = new ApolloServer({
    typeDefs:Schema,
    resolvers:graphqlresolver,
})
await apolloserver.start();
apolloserver.applyMiddleware({app})

app.listen(2000,()=>{
    console.log("server is runnig 2000")})

}
startserver()