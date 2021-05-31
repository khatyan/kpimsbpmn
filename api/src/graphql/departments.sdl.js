export const schema = gql`
  type Department {
    id: Int!
    title: String!
    description: String!
    section: Section
    sectionId: Int
    Indicator: [Indicator]!
    Employees: [User]!
  }

  type Query {
    departments: [Department!]!
    department(id: Int!): Department!
  }

  input CreateDepartmentInput {
    title: String!
    description: String!
    sectionId: Int
  }

  input UpdateDepartmentInput {
    title: String
    description: String
    sectionId: Int
  }

  type Mutation {
    createDepartment(input: CreateDepartmentInput!): Department!
    updateDepartment(id: Int!, input: UpdateDepartmentInput!): Department!
    deleteDepartment(id: Int!): Department!
  }
`
