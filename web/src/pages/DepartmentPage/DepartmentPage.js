import DepartmentsLayout from 'src/layouts/DepartmentsLayout'
import DepartmentCell from 'src/components/DepartmentCell'

const DepartmentPage = ({ id }) => {
  return (
    <DepartmentsLayout>
      <DepartmentCell id={id} />
    </DepartmentsLayout>
  )
}

export default DepartmentPage
