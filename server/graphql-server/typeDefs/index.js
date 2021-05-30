const {gql} = require('apollo-server-express')
/**
Supported types

  Scalar types

    ps: GraphQL's default scalar types are:
          Int: A signed 32‐bit integer
          Float: A signed double-precision floating-point value
          String: A UTF‐8 character sequence
          Boolean: true or false
          ID (serialized as a String): A unique identifier that's often used to refetch an object or as the key for a cache. Although it's serialized as a String, an ID is not intended to be human‐readable.

        custom scalar types

          // defined
          const { GraphQLScalarType, Kind } = require('graphql');
          const dateScalar = new GraphQLScalarType({
            name: 'Date',
            description: 'Date custom scalar type',
            serialize(value) {
              return value.getTime(); // Convert outgoing Date to integer for JSON
            },
            parseValue(value) {
              return new Date(value); // Convert incoming integer to Date
            },
            parseLiteral(ast) {
              if (ast.kind === Kind.INT) {
                return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
              }
              return null; // Invalid hard-coded value (not an integer)
            },
          });

          // use
          const typeDefs = gql`
            scalar Date
          `;
          const resolvers = {
            Date: dateScalar
            // ...other resolvers...
          };



  Object types

    ps: type Book {
          title: String
          author: Author
        }

  The Query type

    ps: type Query {
          books: [Book]
          authors: [Author]
        }

  The Mutation type

    ps: type Mutation {
          createPost(title: String, body: String, mediaUrls: [String]): Post
        }

  Input types

    ps: input PostAndMediaInput {
          title: String
          body: String
          mediaUrls: [String]
        }
        type Mutation {
          createPost(post: PostAndMediaInput): Post
        }

  Enum types

    ps: enum AllowedColor {
          RED
          GREEN
          BLUE
        }

  Union type

        ps: union Media = Book | Movie

  Interface type
        
    ps: interface MutationResponse {
          code: String!
          success: Boolean!
          message: String!
        }

        type xxx implements MutationResponse {

        }
*/

const typeDefs = gql`

  # scalar Date
  directive @upper on FIELD_DEFINITION

  type Company {
    id: String
    name: String @upper
    # date: Date
  }

  type User {
    id: String
    name: String @upper
    company: Company
  }

  # 查询操作
  type Query {
    getCompany(id: String,name: String): Company
    getUser(id: String,name: String): User
    users: [User]
    companies: [Company]
  }

  # 更新操作 
  type Mutation {
    addCompany(name: String!): Company
    addUser(name: String!,companyId:String!): User
    updateUser(id: String!,name: String,,companyId:String ): User
    deleteUser(id: String!): User
  }
`;

module.exports = typeDefs