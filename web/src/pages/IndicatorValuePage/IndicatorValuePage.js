import IndicatorValuesLayout from 'src/layouts/IndicatorValuesLayout'
import IndicatorValueCell from 'src/components/IndicatorValueCell'

const IndicatorValuePage = ({ id }) => {
  return (
    <IndicatorValuesLayout>
      <IndicatorValueCell id={id} />
    </IndicatorValuesLayout>
  )
}

export default IndicatorValuePage
