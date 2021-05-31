import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_WORKFLOW_STATUS_MUTATION = gql`
  mutation DeleteWorkflowStatusMutation($id: Int!) {
    deleteWorkflowStatus(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const WorkflowStatus = ({ workflowStatus }) => {
  const { addMessage } = useFlash()
  const [deleteWorkflowStatus] = useMutation(DELETE_WORKFLOW_STATUS_MUTATION, {
    onCompleted: () => {
      navigate(routes.workflowStatuses())
      addMessage('WorkflowStatus deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete workflowStatus ' + id + '?')) {
      deleteWorkflowStatus({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            WorkflowStatus {workflowStatus.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{workflowStatus.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{workflowStatus.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{workflowStatus.description}</td>
            </tr>
            <tr>
              <th>Workflow id</th>
              <td>{workflowStatus.workflowId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editWorkflowStatus({ id: workflowStatus.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(workflowStatus.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default WorkflowStatus
