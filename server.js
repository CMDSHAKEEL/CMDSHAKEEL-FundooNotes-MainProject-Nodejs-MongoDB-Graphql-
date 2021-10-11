const express = require('express');
const { ApolloServer, gql} = require('apollo-server-express')
 
const mongoose = require('mongoose')
const app = express()

app.listen(2000,()=>{console.log("server is runnig 2000")})

