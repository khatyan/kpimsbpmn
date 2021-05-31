import ReactBpmnModel from 'src/components/ReactBpmnModel'
import KpimsLayout from 'src/layouts/KpimsLayout'
import { useQuery, useMutation } from '@redwoodjs/web'

export const QUERY = gql`
  query FIND_WORKFLOW_BY_ID($id: Int!) {
    workflow: workflow(id: $id) {
      id
      title
      description
      xml
    }
  }
`
const UPDATE_WORKFLOW_MUTATION = gql`
  mutation UpdateWorkflowMutation($id: Int!, $input: UpdateWorkflowInput!) {
    updateWorkflow(id: $id, input: $input) {
      id
    }
  }
`
const WorkflowBpmnPage = () => {
  const [updateWorkflow, { loadingwf, errorwf }] = useMutation(
    UPDATE_WORKFLOW_MUTATION,
    {
      onCompleted: () => {
        //addMessage('Workflow updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const { loading, error, data } = useQuery(QUERY, {
    variables: { id: 1 },
  })
  //console.log(data, 'XML')
  function onShown() {
    console.log('diagram shown', data)
  }

  function onLoading() {
    console.log('diagram loading')
  }

  function onError(err) {
    console.log('failed to show diagram')
  }
  function onSave(xml) {
    const input = {
      title: data.workflow.title,
      description: data.workflow.description,
      xml: ' ' + xml,
    }
    const id = data.workflow.id
    console.log(input)
    updateWorkflow({ variables: { id, input } })
  }
  if (data) {
    return (
      <>
        <KpimsLayout>
          <div className="canvas" id="js-canvas">
            <ReactBpmnModel
              onShown={onShown}
              onLoading={onLoading}
              onSave={onSave}
              onError={onError}
              diagramXML={data.workflow.xml}
            />
          </div>
        </KpimsLayout>
      </>
    )
  } else {
    return (
      <>
        <KpimsLayout>
          loading
          <div className="canvas" id="js-canvas">
            <ReactBpmnModel
              url="/public/diagram.bpmn"
              onShown={onShown}
              onLoading={onLoading}
              onSave={onSave}
              onError={onError}
            />
          </div>
        </KpimsLayout>
      </>
    )
  }
}

export default WorkflowBpmnPage
