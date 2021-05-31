import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import DepartmentForm from 'src/components/DepartmentForm'

const CREATE_DEPARTMENT_MUTATION = gql`
  mutation CreateDepartmentMutation($input: CreateDepartmentInput!) {
    createDepartment(input: $input) {
      id
    }
  }
`

const NewDepartment = () => {
  const { addMessage } = useFlash()
  const [createDepartment, { loading, error }] = useMutation(
    CREATE_DEPARTMENT_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.departments())
        addMessage('Department created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      sectionId: parseInt(input.sectionId),
    })
    createDepartment({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Department</h2>
      </header>
      <div className="rw-segment-main">
        <DepartmentForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDepartment
