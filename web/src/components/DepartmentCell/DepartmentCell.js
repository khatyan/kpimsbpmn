import Department from 'src/components/Department'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Department not found</div>

export const Success = ({ department }) => {
  return <Department department={department} />
}
