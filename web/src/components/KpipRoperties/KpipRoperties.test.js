import { render } from '@redwoodjs/testing'

import KPIPRoperties from './KPIPRoperties'

describe('KPIPRoperties', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<KPIPRoperties />)
    }).not.toThrow()
  })
})
