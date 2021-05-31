export const schema = gql`
  type User {
    id: Int!
    email: String!
    password: String!
    name: String
    IndicatorValue: [IndicatorValue]!
    Indicator: [Indicator]!
    department: Department
    departmentId: Int
    WorkflowStatus: [WorkflowStatus]!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User!
  }

  input CreateUserInput {
    email: String!
    password: String!
    name: String
    departmentId: Int
  }

  input UpdateUserInput {
    email: String
    password: String
    name: String
    departmentId: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: Int!, input: UpdateUserInput!): User!
    deleteUser(id: Int!): User!
  }
`
