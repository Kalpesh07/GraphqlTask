const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require( `cors` );


const app = express();

app.use( cors() );
app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }));  

app.listen(process.env.PORT || 5000, () => {
    console.log('now listening for requests on port 5000');
});