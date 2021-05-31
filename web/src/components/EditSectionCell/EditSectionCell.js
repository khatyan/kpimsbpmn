import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import SectionForm from 'src/components/SectionForm'

export const QUERY = gql`
  query FIND_SECTION_BY_ID($id: Int!) {
    section: section(id: $id) {
      id
      title
      description
    }
  }
`
const UPDATE_SECTION_MUTATION = gql`
  mutation UpdateSectionMutation($id: Int!, $input: UpdateSectionInput!) {
    updateSection(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ section }) => {
  const { addMessage } = useFlash()
  const [updateSection, { loading, error }] = useMutation(
    UPDATE_SECTION_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.sections())
        addMessage('Section updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateSection({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Section {section.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SectionForm
          section={section}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
