import Workflow from 'src/components/Workflow'

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

export const Empty = () => <div>Workflow not found</div>

export const Success = ({ workflow }) => {
  return <Workflow workflow={workflow} />
}
