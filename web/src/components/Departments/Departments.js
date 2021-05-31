import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_DEPARTMENT_MUTATION = gql`
  mutation DeleteDepartmentMutation($id: Int!) {
    deleteDepartment(id: $id) {
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

const DepartmentsList = ({ departments }) => {
  const { addMessage } = useFlash()
  const [deleteDepartment] = useMutation(DELETE_DEPARTMENT_MUTATION, {
    onCompleted: () => {
      addMessage('Department deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete department ' + id + '?')) {
      deleteDepartment({ variables: { id }, refetchQueries: ['DEPARTMENTS'] })
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
            <th>Section id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{truncate(department.id)}</td>
              <td>{truncate(department.title)}</td>
              <td>{truncate(department.description)}</td>
              <td>{truncate(department.sectionId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.department({ id: department.id })}
                    title={'Show department ' + department.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editDepartment({ id: department.id })}
                    title={'Edit department ' + department.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete department ' + department.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(department.id)}
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

export default DepartmentsList
