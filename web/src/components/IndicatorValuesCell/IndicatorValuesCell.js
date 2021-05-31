import { Link, routes } from '@redwoodjs/router'

import IndicatorValues from 'src/components/IndicatorValues'

export const QUERY = gql`
  query INDICATOR_VALUES {
    indicatorValues {
      id
      title
      description
      creationDate
      modfiedDate
      IndicatorId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No indicatorValues yet. '}
      <Link to={routes.newIndicatorValue()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ indicatorValues }) => {
  return <IndicatorValues indicatorValues={indicatorValues} />
}
