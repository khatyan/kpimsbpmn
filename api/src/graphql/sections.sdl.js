export const schema = gql`
  type Section {
    id: Int!
    title: String!
    description: String!
    departments: [Department]!
  }

  type Query {
    sections: [Section!]!
    section(id: Int!): Section!
  }

  input CreateSectionInput {
    title: String!
    description: String!
  }

  input UpdateSectionInput {
    title: String
    description: String
  }

  type Mutation {
    createSection(input: CreateSectionInput!): Section!
    updateSection(id: Int!, input: UpdateSectionInput!): Section!
    deleteSection(id: Int!): Section!
  }
`
