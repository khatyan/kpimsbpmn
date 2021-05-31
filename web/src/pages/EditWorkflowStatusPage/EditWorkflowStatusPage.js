import WorkflowStatusesLayout from 'src/layouts/WorkflowStatusesLayout'
import EditWorkflowStatusCell from 'src/components/EditWorkflowStatusCell'

const EditWorkflowStatusPage = ({ id }) => {
  return (
    <WorkflowStatusesLayout>
      <EditWorkflowStatusCell id={id} />
    </WorkflowStatusesLayout>
  )
}

export default EditWorkflowStatusPage
