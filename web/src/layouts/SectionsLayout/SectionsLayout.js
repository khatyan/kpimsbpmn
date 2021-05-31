import { Link, routes } from '@redwoodjs/router'
import { Flash } from '@redwoodjs/web'

const SectionsLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Flash timeout={1000} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.sections()} className="rw-link">
            Sections
          </Link>
        </h1>
        <Link to={routes.newSection()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Section
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default SectionsLayout
