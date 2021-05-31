import IndicatorValuesLayout from 'src/layouts/IndicatorValuesLayout'
import EditIndicatorValueCell from 'src/components/EditIndicatorValueCell'

const EditIndicatorValuePage = ({ id }) => {
  return (
    <IndicatorValuesLayout>
      <EditIndicatorValueCell id={id} />
    </IndicatorValuesLayout>
  )
}

export default EditIndicatorValuePage
