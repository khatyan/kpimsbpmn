import { Link, routes } from '@redwoodjs/router'

import Sections from 'src/components/Sections'

export const QUERY = gql`
  query SECTIONS {
    sections {
      id
      title
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No sections yet. '}
      <Link to={routes.newSection()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ sections }) => {
  return <Sections sections={sections} />
}
