import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import WorkflowForm from 'src/components/WorkflowForm'

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
const UPDATE_WORKFLOW_MUTATION = gql`
  mutation UpdateWorkflowMutation($id: Int!, $input: UpdateWorkflowInput!) {
    updateWorkflow(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ workflow }) => {
  const { addMessage } = useFlash()
  const [updateWorkflow, { loading, error }] = useMutation(
    UPDATE_WORKFLOW_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.workflows())
        addMessage('Workflow updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    console.log(input, 'Workflow')
    updateWorkflow({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Workflow {workflow.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <WorkflowForm
          workflow={workflow}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
