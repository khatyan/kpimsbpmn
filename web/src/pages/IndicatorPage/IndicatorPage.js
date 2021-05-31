import IndicatorsLayout from 'src/layouts/IndicatorsLayout'
import IndicatorCell from 'src/components/IndicatorCell'

const IndicatorPage = ({ id }) => {
  return (
    <IndicatorsLayout>
      <IndicatorCell id={id} />
    </IndicatorsLayout>
  )
}

export default IndicatorPage
