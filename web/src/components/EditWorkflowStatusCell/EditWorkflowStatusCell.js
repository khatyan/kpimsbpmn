import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import WorkflowStatusForm from 'src/components/WorkflowStatusForm'

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
const UPDATE_WORKFLOW_STATUS_MUTATION = gql`
  mutation UpdateWorkflowStatusMutation(
    $id: Int!
    $input: UpdateWorkflowStatusInput!
  ) {
    updateWorkflowStatus(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ workflowStatus }) => {
  const { addMessage } = useFlash()
  const [updateWorkflowStatus, { loading, error }] = useMutation(
    UPDATE_WORKFLOW_STATUS_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.workflowStatuses())
        addMessage('WorkflowStatus updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      workflowId: parseInt(input.workflowId),
    })
    updateWorkflowStatus({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit WorkflowStatus {workflowStatus.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <WorkflowStatusForm
          workflowStatus={workflowStatus}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
