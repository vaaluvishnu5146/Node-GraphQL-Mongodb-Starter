const express = require('express');
var chalk = require('chalk');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
 
const app = express();

const MyGraphQLSchema = buildSchema(`
    type RootQuery {
        restaurants: [String!]!
    }
    type RootMutation {
        createRestaurant(name: String): String
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

app.use(
  '/graphql',
  graphqlHTTP(async (request, response, graphQLParams) => ({
    schema: MyGraphQLSchema,
    rootValue: {
        restaurants: () => {
            return ['A', 'B']
        },
        createRestaurant: (args) => {
            return args.name
        }
    },
    graphiql: true,
  }))
);
 
app.listen(4000, () => {
    console.log(chalk.bgGreen('Application started'))
    console.log(`GraphQL playground`, chalk.underline.bgBlue(`http://localhost:4000/graphql`))
});