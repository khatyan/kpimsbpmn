import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import IndicatorValueForm from 'src/components/IndicatorValueForm'

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
const UPDATE_INDICATOR_VALUE_MUTATION = gql`
  mutation UpdateIndicatorValueMutation(
    $id: Int!
    $input: UpdateIndicatorValueInput!
  ) {
    updateIndicatorValue(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ indicatorValue }) => {
  const { addMessage } = useFlash()
  const [updateIndicatorValue, { loading, error }] = useMutation(
    UPDATE_INDICATOR_VALUE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.indicatorValues())
        addMessage('IndicatorValue updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      IndicatorId: parseInt(input.IndicatorId),
      userId: parseInt(input.userId),
    })
    updateIndicatorValue({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit IndicatorValue {indicatorValue.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IndicatorValueForm
          indicatorValue={indicatorValue}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
