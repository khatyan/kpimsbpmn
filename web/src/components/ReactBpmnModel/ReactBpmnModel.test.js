import { render } from '@redwoodjs/testing'

import ReactBpmnModel from './ReactBpmnModel'

describe('ReactBpmnModel', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReactBpmnModel />)
    }).not.toThrow()
  })
})
