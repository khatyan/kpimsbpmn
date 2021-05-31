import React from 'react'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import Button from '@material-ui/core/Button'

export default class ReactBpmnModel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.containerRef = React.createRef()
  }

  componentDidMount() {
    const { url, diagramXML } = this.props

    const container = this.containerRef.current

    this.bpmnViewer = new BpmnModeler({ container })
    this.bpmnViewer.on('shape.added', (event) => {
      const elementRegistry = this.bpmnViewer.get('elementRegistry')
      const serviceTasks = elementRegistry.filter(
        (e) => e.type === 'bpmn:StartEvent'
      )
      // var modeling = this.bpmnViewer.get('modeling')
      console.log('elementRegistry', elementRegistry)
      // if (serviceTasks.length > 0) {
      //   modeling.setColor(serviceTasks, {
      //     stroke: 'green',
      //     fill: 'yellow',
      //   })
      // }
      console.log(serviceTasks, event)
    })

    this.bpmnViewer.on('import.done', (event) => {
      const { error, warnings } = event

      if (error) {
        return this.handleError(error)
      }

      this.bpmnViewer.get('canvas').zoom('fit-viewport')

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
    return (
      <>
        <div
          className="react-bpmn-diagram-container"
          ref={this.containerRef}
        ></div>

        <Button onClick={this.saveXML.bind(this)}> save </Button>
      </>
    )
  }
}
