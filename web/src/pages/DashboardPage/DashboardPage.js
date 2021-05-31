import KPIMSLayout from 'src/layouts/KpimsLayout'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const DashboardPage = () => {
  const options = {
    title: {
      text: 'My chart',
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  }
  return (
    <>
      <KPIMSLayout>
        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </KPIMSLayout>
    </>
  )
}

export default DashboardPage
