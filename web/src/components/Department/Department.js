import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_DEPARTMENT_MUTATION = gql`
  mutation DeleteDepartmentMutation($id: Int!) {
    deleteDepartment(id: $id) {
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

const Department = ({ department }) => {
  const { addMessage } = useFlash()
  const [deleteDepartment] = useMutation(DELETE_DEPARTMENT_MUTATION, {
    onCompleted: () => {
      navigate(routes.departments())
      addMessage('Department deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete department ' + id + '?')) {
      deleteDepartment({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Department {department.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{department.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{department.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{department.description}</td>
            </tr>
            <tr>
              <th>Section id</th>
              <td>{department.sectionId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDepartment({ id: department.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(department.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Department
