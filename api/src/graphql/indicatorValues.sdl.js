export const schema = gql`
  type IndicatorValue {
    id: Int!
    title: String!
    description: String!
    creationDate: DateTime!
    modfiedDate: DateTime!
    modifiedBy: User!
    Indicator: Indicator
    IndicatorId: Int
    userId: Int!
  }

  type Query {
    indicatorValues: [IndicatorValue!]!
    indicatorValue(id: Int!): IndicatorValue!
  }

  input CreateIndicatorValueInput {
    title: String!
    description: String!
    creationDate: DateTime!
    modfiedDate: DateTime!
    IndicatorId: Int
    userId: Int!
  }

  input UpdateIndicatorValueInput {
    title: String
    description: String
    creationDate: DateTime
    modfiedDate: DateTime
    IndicatorId: Int
    userId: Int
  }

  type Mutation {
    createIndicatorValue(input: CreateIndicatorValueInput!): IndicatorValue!
    updateIndicatorValue(
      id: Int!
      input: UpdateIndicatorValueInput!
    ): IndicatorValue!
    deleteIndicatorValue(id: Int!): IndicatorValue!
  }
`
