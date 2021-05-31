import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import IndicatorValueForm from 'src/components/IndicatorValueForm'

const CREATE_INDICATOR_VALUE_MUTATION = gql`
  mutation CreateIndicatorValueMutation($input: CreateIndicatorValueInput!) {
    createIndicatorValue(input: $input) {
      id
    }
  }
`

const NewIndicatorValue = () => {
  const { addMessage } = useFlash()
  const [createIndicatorValue, { loading, error }] = useMutation(
    CREATE_INDICATOR_VALUE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.indicatorValues())
        addMessage('IndicatorValue created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      IndicatorId: parseInt(input.IndicatorId),
      userId: parseInt(input.userId),
    })
    createIndicatorValue({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New IndicatorValue</h2>
      </header>
      <div className="rw-segment-main">
        <IndicatorValueForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewIndicatorValue
