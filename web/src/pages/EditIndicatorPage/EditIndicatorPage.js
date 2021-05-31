import IndicatorsLayout from 'src/layouts/IndicatorsLayout'
import EditIndicatorCell from 'src/components/EditIndicatorCell'

const EditIndicatorPage = ({ id }) => {
  return (
    <IndicatorsLayout>
      <EditIndicatorCell id={id} />
    </IndicatorsLayout>
  )
}

export default EditIndicatorPage
