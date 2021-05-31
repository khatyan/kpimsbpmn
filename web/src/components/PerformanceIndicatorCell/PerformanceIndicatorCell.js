import DataTable from 'react-data-table-component'
import { Link, routes } from '@redwoodjs/router'

const columns = [
  {
    name: 'Id',
    selector: 'id',
    sortable: true,
  },
  {
    cell: (row) => (
      <Link to={routes.kpiPropertiesPage({ id: row.id })}>{row.title}</Link>
    ),
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Description',
    selector: 'description',
    sortable: true,
  },
  {
    name: 'Created on',
    selector: 'creationDate',
    sortable: true,
  },
]

export const QUERY = gql`
  query {
    indicators {
      id
      title
      description
      creationDate
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ indicators, onClick }) => {
  return (
    <DataTable
      title="Indicators"
      columns={columns}
      data={indicators}
      selectableRows={false}
      selectableRowsHighlight={true}
      onSelectedRowsChange={onClick}
    />
  )
}
