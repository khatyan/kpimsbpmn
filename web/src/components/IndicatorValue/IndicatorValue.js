import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_INDICATOR_VALUE_MUTATION = gql`
  mutation DeleteIndicatorValueMutation($id: Int!) {
    deleteIndicatorValue(id: $id) {
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

const IndicatorValue = ({ indicatorValue }) => {
  const { addMessage } = useFlash()
  const [deleteIndicatorValue] = useMutation(DELETE_INDICATOR_VALUE_MUTATION, {
    onCompleted: () => {
      navigate(routes.indicatorValues())
      addMessage('IndicatorValue deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete indicatorValue ' + id + '?')) {
      deleteIndicatorValue({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            IndicatorValue {indicatorValue.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{indicatorValue.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{indicatorValue.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{indicatorValue.description}</td>
            </tr>
            <tr>
              <th>Creation date</th>
              <td>{timeTag(indicatorValue.creationDate)}</td>
            </tr>
            <tr>
              <th>Modfied date</th>
              <td>{timeTag(indicatorValue.modfiedDate)}</td>
            </tr>
            <tr>
              <th>Indicator id</th>
              <td>{indicatorValue.IndicatorId}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{indicatorValue.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIndicatorValue({ id: indicatorValue.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(indicatorValue.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default IndicatorValue
