const express = require('express');
const { ApolloServer, gql} = require('apollo-server-express')
const dbConfig =  require('./DB.Config/database.config')
 
const app = express()
require('dotenv').config();

dbConfig.dbConnection();

const apolloserver = new ApolloServer({
    typeDefs:Schema,
    resolvers:graphqlresolver,
})

apolloserver.applyMiddleware({app})

app.listen(2000,()=>{console.log("server is runnig 2000")})

