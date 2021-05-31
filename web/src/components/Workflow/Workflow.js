import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_WORKFLOW_MUTATION = gql`
  mutation DeleteWorkflowMutation($id: Int!) {
    deleteWorkflow(id: $id) {
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

const Workflow = ({ workflow }) => {
  const { addMessage } = useFlash()
  const [deleteWorkflow] = useMutation(DELETE_WORKFLOW_MUTATION, {
    onCompleted: () => {
      navigate(routes.workflows())
      addMessage('Workflow deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete workflow ' + id + '?')) {
      deleteWorkflow({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Workflow {workflow.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{workflow.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{workflow.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{workflow.description}</td>
            </tr>
            <tr>
              <th>Xml</th>
              <td>{workflow.xml}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editWorkflow({ id: workflow.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(workflow.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Workflow
