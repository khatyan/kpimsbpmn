import { render } from '@redwoodjs/testing'

import KpimsLayout from './KpimsLayout'

describe('KpimsLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<KpimsLayout />)
    }).not.toThrow()
  })
})
