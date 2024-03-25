const express = require('express')
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}
require('dotenv').config()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const port = process.env.PORT || 3000
const connectDB = require('./config/db')

const app = express()

//Connect Database
connectDB()

//CORS
app.use(cors(corsOptions))

//Use GraphQL & dotENV
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
})
)

app.listen(port, () => {
  console.log(`Hello there from http://localhost:${port}`);
});
//access by going to localhost/port/graphql