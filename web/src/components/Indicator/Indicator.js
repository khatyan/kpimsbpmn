import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_INDICATOR_MUTATION = gql`
  mutation DeleteIndicatorMutation($id: Int!) {
    deleteIndicator(id: $id) {
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

const Indicator = ({ indicator }) => {
  const { addMessage } = useFlash()
  const [deleteIndicator] = useMutation(DELETE_INDICATOR_MUTATION, {
    onCompleted: () => {
      navigate(routes.indicators())
      addMessage('Indicator deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete indicator ' + id + '?')) {
      deleteIndicator({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Indicator {indicator.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{indicator.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{indicator.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{indicator.description}</td>
            </tr>
            <tr>
              <th>Formula</th>
              <td>{indicator.formula}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{indicator.type}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(indicator.date)}</td>
            </tr>
            <tr>
              <th>Creation date</th>
              <td>{timeTag(indicator.creationDate)}</td>
            </tr>
            <tr>
              <th>Modfied date</th>
              <td>{timeTag(indicator.modfiedDate)}</td>
            </tr>
            <tr>
              <th>Approval status</th>
              <td>{indicator.approvalStatus}</td>
            </tr>
            <tr>
              <th>Actual value</th>
              <td>{indicator.actualValue}</td>
            </tr>
            <tr>
              <th>Current value</th>
              <td>{indicator.currentValue}</td>
            </tr>
            <tr>
              <th>Target value</th>
              <td>{indicator.targetValue}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{indicator.userId}</td>
            </tr>
            <tr>
              <th>Department id</th>
              <td>{indicator.departmentId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIndicator({ id: indicator.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(indicator.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Indicator
