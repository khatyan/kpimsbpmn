import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_WORKFLOW_STATUS_MUTATION = gql`
  mutation DeleteWorkflowStatusMutation($id: Int!) {
    deleteWorkflowStatus(id: $id) {
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

const WorkflowStatusesList = ({ workflowStatuses }) => {
  const { addMessage } = useFlash()
  const [deleteWorkflowStatus] = useMutation(DELETE_WORKFLOW_STATUS_MUTATION, {
    onCompleted: () => {
      addMessage('WorkflowStatus deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete workflowStatus ' + id + '?')) {
      deleteWorkflowStatus({
        variables: { id },
        refetchQueries: ['WORKFLOW_STATUSES'],
      })
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
            <th>Workflow id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {workflowStatuses.map((workflowStatus) => (
            <tr key={workflowStatus.id}>
              <td>{truncate(workflowStatus.id)}</td>
              <td>{truncate(workflowStatus.title)}</td>
              <td>{truncate(workflowStatus.description)}</td>
              <td>{truncate(workflowStatus.workflowId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.workflowStatus({ id: workflowStatus.id })}
                    title={
                      'Show workflowStatus ' + workflowStatus.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editWorkflowStatus({ id: workflowStatus.id })}
                    title={'Edit workflowStatus ' + workflowStatus.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete workflowStatus ' + workflowStatus.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(workflowStatus.id)}
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

export default WorkflowStatusesList
