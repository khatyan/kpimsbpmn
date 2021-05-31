import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import IndicatorForm from 'src/components/IndicatorForm'

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
const UPDATE_INDICATOR_MUTATION = gql`
  mutation UpdateIndicatorMutation($id: Int!, $input: UpdateIndicatorInput!) {
    updateIndicator(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ indicator }) => {
  const { addMessage } = useFlash()
  const [updateIndicator, { loading, error }] = useMutation(
    UPDATE_INDICATOR_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.indicators())
        addMessage('Indicator updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      userId: parseInt(input.userId),
      departmentId: parseInt(input.departmentId),
    })
    updateIndicator({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Indicator {indicator.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IndicatorForm
          indicator={indicator}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
