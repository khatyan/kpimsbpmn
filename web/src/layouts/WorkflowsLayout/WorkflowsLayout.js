import { Link, routes } from '@redwoodjs/router'
import { Flash } from '@redwoodjs/web'

const WorkflowsLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Flash timeout={1000} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.workflows()} className="rw-link">
            Workflows
          </Link>
        </h1>
        <Link to={routes.newWorkflow()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Workflow
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default WorkflowsLayout
