import WorkflowStatusesLayout from 'src/layouts/WorkflowStatusesLayout'
import WorkflowStatusCell from 'src/components/WorkflowStatusCell'

const WorkflowStatusPage = ({ id }) => {
  return (
    <WorkflowStatusesLayout>
      <WorkflowStatusCell id={id} />
    </WorkflowStatusesLayout>
  )
}

export default WorkflowStatusPage
