import SectionsLayout from 'src/layouts/SectionsLayout'
import SectionCell from 'src/components/SectionCell'

const SectionPage = ({ id }) => {
  return (
    <SectionsLayout>
      <SectionCell id={id} />
    </SectionsLayout>
  )
}

export default SectionPage
