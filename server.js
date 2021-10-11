const express = require('express');
const { ApolloServer, gql} = require('apollo-server')
const dbConfig =  require('./DB.Config/database.config')
 
const app = express()
require('dotenv').config();

dbConfig.dbConnection();

app.listen(2000,()=>{console.log("server is runnig 2000")})

