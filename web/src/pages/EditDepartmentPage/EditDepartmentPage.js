import DepartmentsLayout from 'src/layouts/DepartmentsLayout'
import EditDepartmentCell from 'src/components/EditDepartmentCell'

const EditDepartmentPage = ({ id }) => {
  return (
    <DepartmentsLayout>
      <EditDepartmentCell id={id} />
    </DepartmentsLayout>
  )
}

export default EditDepartmentPage
