import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import SectionForm from 'src/components/SectionForm'

const CREATE_SECTION_MUTATION = gql`
  mutation CreateSectionMutation($input: CreateSectionInput!) {
    createSection(input: $input) {
      id
    }
  }
`

const NewSection = () => {
  const { addMessage } = useFlash()
  const [createSection, { loading, error }] = useMutation(
    CREATE_SECTION_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.sections())
        addMessage('Section created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createSection({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Section</h2>
      </header>
      <div className="rw-segment-main">
        <SectionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSection
