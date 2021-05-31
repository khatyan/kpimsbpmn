import WorkflowsLayout from 'src/layouts/WorkflowsLayout'
import WorkflowCell from 'src/components/WorkflowCell'

const WorkflowPage = ({ id }) => {
  return (
    <WorkflowsLayout>
      <WorkflowCell id={id} />
    </WorkflowsLayout>
  )
}

export default WorkflowPage
