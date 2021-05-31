import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import IndicatorForm from 'src/components/IndicatorForm'

const CREATE_INDICATOR_MUTATION = gql`
  mutation CreateIndicatorMutation($input: CreateIndicatorInput!) {
    createIndicator(input: $input) {
      id
    }
  }
`

const NewIndicator = () => {
  const { addMessage } = useFlash()
  const [createIndicator, { loading, error }] = useMutation(
    CREATE_INDICATOR_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.indicators())
        addMessage('Indicator created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      userId: parseInt(input.userId),
      departmentId: parseInt(input.departmentId),
    })
    createIndicator({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Indicator</h2>
      </header>
      <div className="rw-segment-main">
        <IndicatorForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewIndicator
