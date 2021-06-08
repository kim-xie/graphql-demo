
/**
  Default directives
  
    @deprecated(reason: String)
    @skip(if: Boolean!)
    @include(if: Boolean!)

  Custom schema directives
    const { ApolloServer, gql, SchemaDirectiveVisitor } = require('apollo-server');
    const { defaultFieldResolver } = require('graphql');

    // Subclass definition for @upper directive logic
    class UpperCaseDirective extends SchemaDirectiveVisitor {
      visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args) {
          const result = await resolve.apply(this, args);
          if (typeof result === 'string') {
            return result.toUpperCase();
          }
          return result;
        };
      }
    }

    // Schema definition (including custom directive)
    const typeDefs = gql`

      directive @upper on FIELD_DEFINITION | ENUM_VALUE

      type Query {
        hello: String @upper
      }
    `;

    // Resolvers
    const resolvers = {
      Query: {
        hello: (parent, args, context) => {
          return 'Hello world!';
        },
      },
    };

    // Add directive to the ApolloServer constructor
    const server = new ApolloServer({
      typeDefs,
      resolvers,

      schemaDirectives: {
        upper: UpperCaseDirective,
      }
    });

    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`)
    });

*/

const { SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver } = require('graphql');

// Subclass definition for @upper directive logic
class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === 'string') {
        return result.toUpperCase();
      }
      return result;
    };
  }
}

module.exports = {
  UpperCaseDirective
}