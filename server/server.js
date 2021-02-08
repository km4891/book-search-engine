const express = require('express');
const path = require('path');
const db = require('./config/connection');

// ---------------------------------------------------
// DELETE THIS WHEN REFACTORING IS COMPLETE ----------
const routes = require('./routes');
// DELETE THIS WHEN REFACTORING IS COMPLETE ----------
// ---------------------------------------------------

// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

// import authentication middleware
const { authMiddleware } = require('./utils/auth');

// create new Apollo server and pass in schema data and authentication
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();
const PORT = process.env.PORT || 3001;

// integrate Apollo server with the Express application 
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// ---------------------------------------------------
// DELETE THIS WHEN REFACTORING IS COMPLETE ----------
app.use(routes);
// DELETE THIS WHEN REFACTORING IS COMPLETE ----------
// ---------------------------------------------------

// serve up the React front-end code in production if we make a GET request to any location on the server that doesn't have an explicit route defined
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});