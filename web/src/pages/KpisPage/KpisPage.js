import KpimsLayout from 'src/layouts/KpimsLayout'
import PerformanceIndicatorCell from 'src/components/PerformanceIndicatorCell'

const KpisPage = () => {
  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('PARENT Selected Rows: ', state.selectedRows)
  }
  return (
    <>
      <KpimsLayout>
        <PerformanceIndicatorCell
          onClick={handleChange}
        ></PerformanceIndicatorCell>
      </KpimsLayout>
    </>
  )
}

export default KpisPage
