import { Link, routes } from '@redwoodjs/router'

import Departments from 'src/components/Departments'

export const QUERY = gql`
  query DEPARTMENTS {
    departments {
      id
      title
      description
      sectionId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No departments yet. '}
      <Link to={routes.newDepartment()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ departments }) => {
  return <Departments departments={departments} />
}
