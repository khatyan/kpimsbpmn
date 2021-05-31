import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_WORKFLOW_MUTATION = gql`
  mutation DeleteWorkflowMutation($id: Int!) {
    deleteWorkflow(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const WorkflowsList = ({ workflows }) => {
  const { addMessage } = useFlash()
  const [deleteWorkflow] = useMutation(DELETE_WORKFLOW_MUTATION, {
    onCompleted: () => {
      addMessage('Workflow deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete workflow ' + id + '?')) {
      deleteWorkflow({ variables: { id }, refetchQueries: ['WORKFLOWS'] })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Xml</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {workflows.map((workflow) => (
            <tr key={workflow.id}>
              <td>{truncate(workflow.id)}</td>
              <td>{truncate(workflow.title)}</td>
              <td>{truncate(workflow.description)}</td>
              <td>{truncate(workflow.xml)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.workflow({ id: workflow.id })}
                    title={'Show workflow ' + workflow.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editWorkflow({ id: workflow.id })}
                    title={'Edit workflow ' + workflow.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete workflow ' + workflow.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(workflow.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WorkflowsList
