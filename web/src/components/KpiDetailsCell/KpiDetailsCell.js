import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { red } from '@material-ui/core/colors'
import EditIcon from '@material-ui/icons/Edit'
import ShareIcon from '@material-ui/icons/Share'
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined'
import Tooltip from '@material-ui/core/Tooltip'
import Viewer from 'bpmn-js/lib/Viewer'
import { useQuery, useMutation } from '@redwoodjs/web'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import ReactBpmnView from 'src/components/ReactBpmnView'

const { useState } = React

var startEvent
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})
export const FIND_WORKFLOW_BY_ID = gql`
  query FIND_WORKFLOW_BY_ID($id: Int!) {
    workflow: workflow(id: $id) {
      id
      title
      description
      xml
    }
  }
`
export const UPDATEINDICATOR = gql`
  mutation UpdateIndicatorMutation($id: Int!, $input: UpdateIndicatorInput!) {
    updateIndicator(id: $id, input: $input) {
      id
    }
  }
`
export const QUERY = gql`
  query KPIDetailsQuery($id: Int!) {
    indicator(id: $id) {
      id
      title
      description
      creationDate
      modfiedDate
      approvalStatus
      formula
      targetValue
      actualValue
      modifiedBy {
        id
        name
      }
      user {
        id
        name
      }
      department {
        id
        title
      }
    }
  }
`
const viewer = new Viewer()

async function onWorkflowLoaded(
  bpmnDiagramXML,
  setState,
  currentState,
  setOpen
) {
  try {
    const { warnings } = await viewer.importXML(bpmnDiagramXML)
    const elementRegistry = await viewer.get('elementRegistry')
    //setOpen(true)
    const events = await elementRegistry.filter(
      (e) => e.type === 'bpmn:StartEvent'
    )

    events.forEach(async function (value) {
      startEvent = await value.businessObject.name
      setState(startEvent)
    })

    console.log('Imported BPMN 2.0 diagram', warnings)
  } catch (err) {
    const { warnings } = err

    console.log('Failed to import BPMN 2.0 diagram', err, warnings)
  }
}
function handleClick(setOpen) {
  console.log('START THE WORKFLOW')
  setOpen(true)
}
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ indicator }) => {
  const [updateIndicator, { loadingwf, errorwf }] = useMutation(
    UPDATEINDICATOR,
    {
      onCompleted: () => {
        //addMessage('Workflow updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const [state, setState] = useState('start')
  const [open, setOpen] = useState(false)

  function handleButtonEvent(e, indi) {
    indi.approvalStatus = e
    const id = indi.id
    const input = {}
    input.approvalStatus = e

    const { loading, error } = updateIndicator({ variables: { id, input } })
    console.log('Save KPI State', e, indi)
    setOpen(false)
  }
  const { loading, error, data } = useQuery(FIND_WORKFLOW_BY_ID, {
    variables: { id: 1 },
  })

  // if (data) {
  //   if (indicator.status) {
  //     setState(indicator.status)
  //     onWorkflowLoaded(data.workflow.xml, setState, null, setOpen)
  //   } else onWorkflowLoaded(data.workflow.xml, setState, null)
  // }
  const classes = useStyles()

  const bull = <span className={classes.bullet}>•</span>
  if (data) {
    return (
      <Card className={classes.root} variant="outlined">
        <Dialog
          maxWidth={'lg'}
          fullWidth={true}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <DialogTitle id="simple-dialog-title">Kpi Workflow</DialogTitle>
          <ReactBpmnView
            diagramXML={data.workflow.xml}
            currentState={indicator.approvalStatus}
            handleButtonEvent={(value) => handleButtonEvent(value, indicator)}
          ></ReactBpmnView>
        </Dialog>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {indicator.id}
          </Typography>
          <Typography variant="h5" component="h2">
            {indicator.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {indicator.description}
            <p>{indicator.user.name}</p>
          </Typography>

          <p>{indicator.creationDate}</p>
          <p>{indicator.formula}</p>
          <p>{indicator.targetValue}</p>
          <p>{indicator.actualValue}</p>
          <p>{indicator.department.title}</p>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Tooltip title={state} aria-label="add">
            <IconButton aria-label="share" onClick={() => setOpen(true)}>
              <GroupOutlinedIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    )
  } else {
    return 'loading...'
  }
}
