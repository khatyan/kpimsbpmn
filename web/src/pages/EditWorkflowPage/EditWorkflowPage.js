import WorkflowsLayout from 'src/layouts/WorkflowsLayout'
import EditWorkflowCell from 'src/components/EditWorkflowCell'

const EditWorkflowPage = ({ id }) => {
  return (
    <WorkflowsLayout>
      <EditWorkflowCell id={id} />
    </WorkflowsLayout>
  )
}

export default EditWorkflowPage
