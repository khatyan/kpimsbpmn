import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import WorkflowStatusForm from 'src/components/WorkflowStatusForm'

const CREATE_WORKFLOW_STATUS_MUTATION = gql`
  mutation CreateWorkflowStatusMutation($input: CreateWorkflowStatusInput!) {
    createWorkflowStatus(input: $input) {
      id
    }
  }
`

const NewWorkflowStatus = () => {
  const { addMessage } = useFlash()
  const [createWorkflowStatus, { loading, error }] = useMutation(
    CREATE_WORKFLOW_STATUS_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.workflowStatuses())
        addMessage('WorkflowStatus created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      workflowId: parseInt(input.workflowId),
    })
    createWorkflowStatus({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New WorkflowStatus</h2>
      </header>
      <div className="rw-segment-main">
        <WorkflowStatusForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewWorkflowStatus
