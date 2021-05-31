import { render } from '@redwoodjs/testing'

import KpisPage from './KpisPage'

describe('KpisPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<KpisPage />)
    }).not.toThrow()
  })
})
