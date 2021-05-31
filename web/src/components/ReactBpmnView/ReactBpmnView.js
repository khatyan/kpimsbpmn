import React from 'react'
import BpmnViewer from 'bpmn-js/lib/Viewer'
import Button from '@material-ui/core/Button'
var arrButtons = []
var buttonStyle = {
  margin: '10px 10px 10px 0',
}
export default class ReactBpmnModel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.currentState = props.currentState
    console.log('props', props)
    this.containerRef = React.createRef()
    arrButtons = []
  }

  componentDidMount() {
    const { url, diagramXML } = this.props

    const container = this.containerRef.current

    this.bpmnViewer = new BpmnViewer({ container })

    this.bpmnViewer.on('import.done', (event) => {
      const { error, warnings } = event

      if (error) {
        return this.handleError(error)
      }

      this.bpmnViewer.get('canvas').zoom('fit-viewport')
      //var modeling = this.bpmnViewer.get('modeling')
      const elementRegistry = this.bpmnViewer.get('elementRegistry')
      const serviceTasks = elementRegistry.filter(
        (e) => e.type === 'bpmn:StartEvent'
      )
      console.log('this.currentState', this.currentState)
      if (serviceTasks.length > 0 && !this.currentState) {
        console.log('serviceTasks[0]', serviceTasks[0])
        this.bpmnViewer.get('canvas').addMarker(serviceTasks[0].id, 'highlight')
        let bo = serviceTasks[0].businessObject
        for (let i = 0; i < bo.outgoing.length; i++) {
          arrButtons.push(
            <Button
              key={bo.outgoing[i].targetRef.id}
              onClick={() =>
                this.props.handleButtonEvent(bo.outgoing[i].targetRef.id)
              }
            >
              {bo.outgoing[i].targetRef.name}
            </Button>
          )
          this.setState({ arrButtons: arrButtons })
        }
        console.log('arrButtons', arrButtons)
      } else {
        let activity = elementRegistry.get(this.currentState)

        this.bpmnViewer.get('canvas').addMarker(activity.id, 'highlight')

        let bo = activity.businessObject
        console.log('activity', activity)

        if (
          bo.$type == 'bpmn:Task' &&
          bo.outgoing[0].targetRef.$type == 'bpmn:ExclusiveGateway'
        ) {
          bo = bo.outgoing[0].targetRef
          console.log('bo.outgoing[0].targetRef', bo.outgoing[0].targetRef)
        }
        if (activity.type != 'bpmn:Task') {
          bo = activity
          //console.log('activity.outgoing[0].businessObject', bo)
        }

        for (let i = 0; i < bo.outgoing.length; i++) {
          if (bo.outgoing[i].type == 'bpmn:MessageFlow') {
            arrButtons.push(
              <Button
                key={bo.outgoing[i].businessObject.targetRef.id}
                onClick={() =>
                  this.props.handleButtonEvent(
                    bo.outgoing[i].businessObject.targetRef.id
                  )
                }
              >
                {bo.outgoing[i].businessObject.targetRef.name}
              </Button>
            )
          } else {
            arrButtons.push(
              <Button
                key={bo.outgoing[i].targetRef.id}
                onClick={() =>
                  this.props.handleButtonEvent(bo.outgoing[i].targetRef.id)
                }
              >
                {bo.outgoing[i].targetRef.name}
              </Button>
            )
          }
          this.setState({ arrButtons: arrButtons })
        }
      }
      return this.handleShown(warnings)
    })

    if (url) {
      return this.fetchDiagram(url)
    }

    if (diagramXML) {
      return this.displayDiagram(diagramXML)
    }
  }

  componentWillUnmount() {
    this.bpmnViewer.destroy()
  }

  componentDidUpdate(prevProps, prevState) {
    const { props, state } = this

    if (props.url !== prevProps.url) {
      return this.fetchDiagram(props.url)
    }

    const currentXML = props.diagramXML || state.diagramXML

    const previousXML = prevProps.diagramXML || prevState.diagramXML

    if (currentXML && currentXML !== previousXML) {
      console.log(currentXML)
      return this.displayDiagram(currentXML)
    }
  }

  displayDiagram(diagramXML) {
    this.bpmnViewer.importXML(diagramXML)
  }

  fetchDiagram(url) {
    this.handleLoading()

    // fetch(url)
    //   .then((response) => response.text())
    //   .then((text) => this.setState({ diagramXML: text }))
    //   .catch((err) => this.handleError(err))
  }

  handleLoading() {
    const { onLoading } = this.props

    if (onLoading) {
      onLoading()
    }
  }

  handleError(err) {
    const { onError } = this.props

    if (onError) {
      onError(err)
    }
  }

  handleShown(warnings) {
    const { onShown } = this.props

    if (onShown) {
      onShown(warnings)
    }
  }
  async saveXML(e) {
    try {
      const result = await this.bpmnViewer.saveXML()
      const { xml } = result
      this.props.onSave(xml)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    // for (let i = 0; i < 10; i++) {
    //   //Moved your loop outside render()'s return
    //   arrButtons.push(
    //     <Button style={buttonStyle} onClick={this.onClick}>
    //       {i}
    //     </Button>
    //   )
    // }

    return (
      <>
        <div>{arrButtons}</div>
        <div
          className="react-bpmn-diagram-container"
          ref={this.containerRef}
        ></div>
      </>
    )
  }
}
