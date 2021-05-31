import IndicatorValue from 'src/components/IndicatorValue'

export const QUERY = gql`
  query FIND_INDICATOR_VALUE_BY_ID($id: Int!) {
    indicatorValue: indicatorValue(id: $id) {
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

export const Empty = () => <div>IndicatorValue not found</div>

export const Success = ({ indicatorValue }) => {
  return <IndicatorValue indicatorValue={indicatorValue} />
}
