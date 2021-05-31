import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import WorkflowForm from 'src/components/WorkflowForm'

const CREATE_WORKFLOW_MUTATION = gql`
  mutation CreateWorkflowMutation($input: CreateWorkflowInput!) {
    createWorkflow(input: $input) {
      id
    }
  }
`

const NewWorkflow = () => {
  const { addMessage } = useFlash()
  const [createWorkflow, { loading, error }] = useMutation(
    CREATE_WORKFLOW_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.workflows())
        addMessage('Workflow created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createWorkflow({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Workflow</h2>
      </header>
      <div className="rw-segment-main">
        <WorkflowForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewWorkflow
