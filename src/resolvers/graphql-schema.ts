import { gql } from "apollo-server-express";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { AuthContext } from "../model/auth-context";

const baseGql = gql`
type Query {
  greeting: String!
}

type Mutation {
  ping: Boolean!
}
`;

export default () => makeExecutableSchema({
  typeDefs: [
    baseGql,
  ],
  resolvers: {
    Query: {
      greeting: (_, _2, ctx: AuthContext) => `Hello, ${ctx.userId}!`,
    },
    Mutation: {
      ping: () => true,
    }
  },
});