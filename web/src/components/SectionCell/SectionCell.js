import Section from 'src/components/Section'

export const QUERY = gql`
  query FIND_SECTION_BY_ID($id: Int!) {
    section: section(id: $id) {
      id
      title
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Section not found</div>

export const Success = ({ section }) => {
  return <Section section={section} />
}
