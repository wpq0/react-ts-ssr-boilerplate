import { ApolloServer } from 'apollo-server-koa';
const typeDefs = require('../shared/schemas.graphql');

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        employees: () => [
            {
                name: 'abc',
                age: 12,
            },
            {
                name: 'def',
                age: 13,
            },
        ],
    },
};

export default new ApolloServer({ typeDefs, resolvers });
