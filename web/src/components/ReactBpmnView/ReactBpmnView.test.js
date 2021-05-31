import { render } from '@redwoodjs/testing'

import ReactBpmnView from './ReactBpmnView'

describe('ReactBpmnView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReactBpmnView />)
    }).not.toThrow()
  })
})
