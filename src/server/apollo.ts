import { ApolloServer } from 'apollo-server-koa';
const typeDefs = require('../shared/schemas.graphql');

const resolvers = {
    Query: {
        employees: () => [
            {
                name: 'abc',
                age: 12,
            },
            {
                name: 'def',
                age: 13,
            },
            {
                name: 'ghi',
                age: 14,
            },
        ],
    },
};

export default new ApolloServer({ typeDefs, resolvers });
