export const QUERY = gql`
  query FIND_WORKFLOW_BY_ID($id: Int!) {
    workflow: workflow(id: $id) {
      id
      title
      description
      xml
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ workflowUpdate }) => {
  return JSON.stringify(workflowUpdate)
}
