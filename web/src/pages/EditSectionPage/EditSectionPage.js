import SectionsLayout from 'src/layouts/SectionsLayout'
import EditSectionCell from 'src/components/EditSectionCell'

const EditSectionPage = ({ id }) => {
  return (
    <SectionsLayout>
      <EditSectionCell id={id} />
    </SectionsLayout>
  )
}

export default EditSectionPage
