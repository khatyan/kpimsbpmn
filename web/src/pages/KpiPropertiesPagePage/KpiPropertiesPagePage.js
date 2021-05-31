import KpiDetails from 'src/components/KpiDetailsCell'
import KPIMSLayout from 'src/layouts/KpimsLayout'

const KPIPRoperties = ({ id }) => {
  return (
    <KPIMSLayout>
      <KpiDetails id={id}></KpiDetails>
    </KPIMSLayout>
  )
}

export default KPIPRoperties
