import { Link, routes } from '@redwoodjs/router'
import Nav from 'react-bootstrap/Nav'
import Paper from '@material-ui/core/Paper'

const KpimLayout = ({ children }) => {
  return (
    <main className="container" id="js-drop-zone">
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link}>
            <Link to={routes.home()}>Home</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to={routes.kpis()}>Indicators</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link}>
            <Link to={routes.dashboard()}>dashboard</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link}>
            <Link to={routes.workflowBpmn()}>workflow</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link}>
            <Link to={routes.about()}>about</Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* <div></div>
      <nav>
        <ul>
          <li>
            <Link to={routes.home()}>Home</Link>
          </li>
          <li>
            <Link to={routes.kpis()}>Indicators</Link>
          </li>
          <li>
            <Link to={routes.about()}>about</Link>
          </li>
        </ul>
      </nav> */}
      <Paper elevation={3}>{children}</Paper>
    </main>
  )
}

export default KpimLayout
