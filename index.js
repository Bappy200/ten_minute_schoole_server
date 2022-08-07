const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema")
require("dotenv").config();

const PORT = process.env.PORT || 5001;
const app = express();


//db connection
dbConnection();

// middlewaire
app.use(cors());
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql : process.env.NODE_DEV == 'development'
}))


app.get("/",(req, res)=>{
    res.send("hello bro");
})

app.listen(PORT,()=>{
    console.log(`Server run no the port ${PORT}`);
})