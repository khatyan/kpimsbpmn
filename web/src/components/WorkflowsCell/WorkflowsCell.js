import { Link, routes } from '@redwoodjs/router'

import Workflows from 'src/components/Workflows'

export const QUERY = gql`
  query WORKFLOWS {
    workflows {
      id
      title
      description
      xml
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No workflows yet. '}
      <Link to={routes.newWorkflow()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ workflows }) => {
  return <Workflows workflows={workflows} />
}
