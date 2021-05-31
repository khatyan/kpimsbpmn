import { render } from '@redwoodjs/testing'

import KPIPropertiesPagePage from './KPIPropertiesPagePage'

describe('KPIPropertiesPagePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<KPIPropertiesPagePage />)
    }).not.toThrow()
  })
})
