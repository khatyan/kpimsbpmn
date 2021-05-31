import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_INDICATOR_MUTATION = gql`
  mutation DeleteIndicatorMutation($id: Int!) {
    deleteIndicator(id: $id) {
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

const IndicatorsList = ({ indicators }) => {
  const { addMessage } = useFlash()
  const [deleteIndicator] = useMutation(DELETE_INDICATOR_MUTATION, {
    onCompleted: () => {
      addMessage('Indicator deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete indicator ' + id + '?')) {
      deleteIndicator({ variables: { id }, refetchQueries: ['INDICATORS'] })
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
            <th>Formula</th>
            <th>Type</th>
            <th>Date</th>
            <th>Creation date</th>
            <th>Modfied date</th>
            <th>Approval status</th>
            <th>Actual value</th>
            <th>Current value</th>
            <th>Target value</th>
            <th>User id</th>
            <th>Department id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {indicators.map((indicator) => (
            <tr key={indicator.id}>
              <td>{truncate(indicator.id)}</td>
              <td>{truncate(indicator.title)}</td>
              <td>{truncate(indicator.description)}</td>
              <td>{truncate(indicator.formula)}</td>
              <td>{truncate(indicator.type)}</td>
              <td>{timeTag(indicator.date)}</td>
              <td>{timeTag(indicator.creationDate)}</td>
              <td>{timeTag(indicator.modfiedDate)}</td>
              <td>{truncate(indicator.approvalStatus)}</td>
              <td>{truncate(indicator.actualValue)}</td>
              <td>{truncate(indicator.currentValue)}</td>
              <td>{truncate(indicator.targetValue)}</td>
              <td>{truncate(indicator.userId)}</td>
              <td>{truncate(indicator.departmentId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.indicator({ id: indicator.id })}
                    title={'Show indicator ' + indicator.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editIndicator({ id: indicator.id })}
                    title={'Edit indicator ' + indicator.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete indicator ' + indicator.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(indicator.id)}
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

export default IndicatorsList
