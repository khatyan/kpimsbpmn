import { Link, routes } from '@redwoodjs/router'

import WorkflowStatuses from 'src/components/WorkflowStatuses'

export const QUERY = gql`
  query WORKFLOW_STATUSES {
    workflowStatuses {
      id
      title
      description
      workflowId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No workflowStatuses yet. '}
      <Link to={routes.newWorkflowStatus()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ workflowStatuses }) => {
  return <WorkflowStatuses workflowStatuses={workflowStatuses} />
}
