import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const IndicatorValueForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.indicatorValue?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>
        <TextField
          name="title"
          defaultValue={props.indicatorValue?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="title" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>
        <TextField
          name="description"
          defaultValue={props.indicatorValue?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="description" className="rw-field-error" />

        <Label
          name="creationDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Creation date
        </Label>
        <TextField
          name="creationDate"
          defaultValue={props.indicatorValue?.creationDate}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="creationDate" className="rw-field-error" />

        <Label
          name="modfiedDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Modfied date
        </Label>
        <TextField
          name="modfiedDate"
          defaultValue={props.indicatorValue?.modfiedDate}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="modfiedDate" className="rw-field-error" />

        <Label
          name="IndicatorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Indicator id
        </Label>
        <NumberField
          name="IndicatorId"
          defaultValue={props.indicatorValue?.IndicatorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="IndicatorId" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        <NumberField
          name="userId"
          defaultValue={props.indicatorValue?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default IndicatorValueForm
