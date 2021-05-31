export const schema = gql`
  type Workflow {
    id: Int!
    title: String!
    description: String!
    xml: String!
    Statuses: [WorkflowStatus]!
  }

  type Query {
    workflows: [Workflow!]!
    workflow(id: Int!): Workflow!
  }

  input CreateWorkflowInput {
    title: String!
    description: String!
    xml: String!
  }

  input UpdateWorkflowInput {
    title: String
    description: String
    xml: String
  }

  type Mutation {
    createWorkflow(input: CreateWorkflowInput!): Workflow!
    updateWorkflow(id: Int!, input: UpdateWorkflowInput!): Workflow!
    deleteWorkflow(id: Int!): Workflow!
  }
`
