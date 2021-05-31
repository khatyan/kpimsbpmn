import Indicator from 'src/components/Indicator'

export const QUERY = gql`
  query FIND_INDICATOR_BY_ID($id: Int!) {
    indicator: indicator(id: $id) {
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

export const Empty = () => <div>Indicator not found</div>

export const Success = ({ indicator }) => {
  return <Indicator indicator={indicator} />
}
