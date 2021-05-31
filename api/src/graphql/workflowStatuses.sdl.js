export const schema = gql`
  type WorkflowStatus {
    id: Int!
    title: String!
    description: String!
    Workflow: Workflow
    workflowId: Int
    participants: [User]!
  }

  type Query {
    workflowStatuses: [WorkflowStatus!]!
    workflowStatus(id: Int!): WorkflowStatus!
  }

  input CreateWorkflowStatusInput {
    title: String!
    description: String!
    workflowId: Int
  }

  input UpdateWorkflowStatusInput {
    title: String
    description: String
    workflowId: Int
  }

  type Mutation {
    createWorkflowStatus(input: CreateWorkflowStatusInput!): WorkflowStatus!
    updateWorkflowStatus(
      id: Int!
      input: UpdateWorkflowStatusInput!
    ): WorkflowStatus!
    deleteWorkflowStatus(id: Int!): WorkflowStatus!
  }
`
