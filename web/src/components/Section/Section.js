import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_SECTION_MUTATION = gql`
  mutation DeleteSectionMutation($id: Int!) {
    deleteSection(id: $id) {
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

const Section = ({ section }) => {
  const { addMessage } = useFlash()
  const [deleteSection] = useMutation(DELETE_SECTION_MUTATION, {
    onCompleted: () => {
      navigate(routes.sections())
      addMessage('Section deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete section ' + id + '?')) {
      deleteSection({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Section {section.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{section.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{section.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{section.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSection({ id: section.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(section.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Section
