export const schema = gql`
  type Indicator {
    id: Int!
    title: String!
    description: String!
    formula: String!
    type: String!
    date: DateTime!
    values: [IndicatorValue]!
    creationDate: DateTime!
    modfiedDate: DateTime!
    modifiedBy: User!
    approvalStatus: String!
    actualValue: Int!
    currentValue: Int!
    targetValue: Int!
    userId: Int!
    user: User!
    department: Department!
    departmentId: Int!
  }

  type Query {
    indicators: [Indicator!]!
    indicator(id: Int!): Indicator!
  }

  input CreateIndicatorInput {
    title: String!
    description: String!
    formula: String!
    type: String!
    date: DateTime!
    creationDate: DateTime!
    modfiedDate: DateTime!
    approvalStatus: String!
    actualValue: Int!
    currentValue: Int!
    targetValue: Int!
    userId: Int!
    departmentId: Int!
  }

  input UpdateIndicatorInput {
    title: String
    description: String
    formula: String
    type: String
    date: DateTime
    creationDate: DateTime
    modfiedDate: DateTime
    approvalStatus: String
    actualValue: Int
    currentValue: Int
    targetValue: Int
    userId: Int
    departmentId: Int
  }

  type Mutation {
    createIndicator(input: CreateIndicatorInput!): Indicator!
    updateIndicator(id: Int!, input: UpdateIndicatorInput!): Indicator!
    deleteIndicator(id: Int!): Indicator!
  }
`
