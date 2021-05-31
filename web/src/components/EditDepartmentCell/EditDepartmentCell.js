import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import DepartmentForm from 'src/components/DepartmentForm'

export const QUERY = gql`
  query FIND_DEPARTMENT_BY_ID($id: Int!) {
    department: department(id: $id) {
      id
      title
      description
      sectionId
    }
  }
`
const UPDATE_DEPARTMENT_MUTATION = gql`
  mutation UpdateDepartmentMutation($id: Int!, $input: UpdateDepartmentInput!) {
    updateDepartment(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ department }) => {
  const { addMessage } = useFlash()
  const [updateDepartment, { loading, error }] = useMutation(
    UPDATE_DEPARTMENT_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.departments())
        addMessage('Department updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      sectionId: parseInt(input.sectionId),
    })
    updateDepartment({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Department {department.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <DepartmentForm
          department={department}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
