import { render } from '@redwoodjs/testing'

import WorkflowBpmnPage from './WorkflowBpmnPage'

describe('WorkflowBpmnPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WorkflowBpmnPage />)
    }).not.toThrow()
  })
})
