import WorkflowStatus from 'src/components/WorkflowStatus'

export const QUERY = gql`
  query FIND_WORKFLOW_STATUS_BY_ID($id: Int!) {
    workflowStatus: workflowStatus(id: $id) {
      id
      title
      description
      workflowId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>WorkflowStatus not found</div>

export const Success = ({ workflowStatus }) => {
  return <WorkflowStatus workflowStatus={workflowStatus} />
}
