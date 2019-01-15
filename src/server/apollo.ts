import { ApolloServer } from 'apollo-server-koa';
const typeDefs = require('../shared/schemas.graphql');

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
    Employee: {
        name: () => 'vu',
    },
};

export default new ApolloServer({ typeDefs, resolvers });
