import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_INDICATOR_VALUE_MUTATION = gql`
  mutation DeleteIndicatorValueMutation($id: Int!) {
    deleteIndicatorValue(id: $id) {
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

const IndicatorValuesList = ({ indicatorValues }) => {
  const { addMessage } = useFlash()
  const [deleteIndicatorValue] = useMutation(DELETE_INDICATOR_VALUE_MUTATION, {
    onCompleted: () => {
      addMessage('IndicatorValue deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete indicatorValue ' + id + '?')) {
      deleteIndicatorValue({
        variables: { id },
        refetchQueries: ['INDICATOR_VALUES'],
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
            <th>Creation date</th>
            <th>Modfied date</th>
            <th>Indicator id</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {indicatorValues.map((indicatorValue) => (
            <tr key={indicatorValue.id}>
              <td>{truncate(indicatorValue.id)}</td>
              <td>{truncate(indicatorValue.title)}</td>
              <td>{truncate(indicatorValue.description)}</td>
              <td>{timeTag(indicatorValue.creationDate)}</td>
              <td>{timeTag(indicatorValue.modfiedDate)}</td>
              <td>{truncate(indicatorValue.IndicatorId)}</td>
              <td>{truncate(indicatorValue.userId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.indicatorValue({ id: indicatorValue.id })}
                    title={
                      'Show indicatorValue ' + indicatorValue.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editIndicatorValue({ id: indicatorValue.id })}
                    title={'Edit indicatorValue ' + indicatorValue.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete indicatorValue ' + indicatorValue.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(indicatorValue.id)}
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

export default IndicatorValuesList
