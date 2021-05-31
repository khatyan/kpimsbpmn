import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_SECTION_MUTATION = gql`
  mutation DeleteSectionMutation($id: Int!) {
    deleteSection(id: $id) {
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

const SectionsList = ({ sections }) => {
  const { addMessage } = useFlash()
  const [deleteSection] = useMutation(DELETE_SECTION_MUTATION, {
    onCompleted: () => {
      addMessage('Section deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete section ' + id + '?')) {
      deleteSection({ variables: { id }, refetchQueries: ['SECTIONS'] })
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
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <tr key={section.id}>
              <td>{truncate(section.id)}</td>
              <td>{truncate(section.title)}</td>
              <td>{truncate(section.description)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.section({ id: section.id })}
                    title={'Show section ' + section.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSection({ id: section.id })}
                    title={'Edit section ' + section.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete section ' + section.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(section.id)}
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

export default SectionsList
