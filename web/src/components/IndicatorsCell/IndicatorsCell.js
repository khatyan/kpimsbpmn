import { Link, routes } from '@redwoodjs/router'
import Indicators from 'src/components/Indicators'

export const QUERY = gql`
  query INDICATORS {
    indicators {
      id
      title
      description
      formula
      type
      date
      creationDate
      modfiedDate
      approvalStatus
      actualValue
      currentValue
      targetValue
      userId
      departmentId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No indicators yet. '}
      <Link to={routes.newIndicator()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ indicators }) => {
  return <Indicators indicators={indicators} />
}
