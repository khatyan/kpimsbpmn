import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const IndicatorForm = (props) => {
  const onSubmit = (data) => {
    let date = new Date(data.date)
    data.date = date
    let date2 = new Date(data.modfiedDate)
    data.modfiedDate = date2
    let date3 = new Date(data.creationDate)
    data.creationDate = date3
    props.onSave(data, props?.indicator?.id)
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
          defaultValue={props.indicator?.title}
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
          defaultValue={props.indicator?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="description" className="rw-field-error" />

        <Label
          name="formula"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Formula
        </Label>
        <TextField
          name="formula"
          defaultValue={props.indicator?.formula}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="formula" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>
        <TextField
          name="type"
          defaultValue={props.indicator?.type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="type" className="rw-field-error" />

        <Label
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>
        <TextField
          name="date"
          defaultValue={props.indicator?.date}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="date" className="rw-field-error" />

        <Label
          name="creationDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Creation date
        </Label>
        <TextField
          name="creationDate"
          defaultValue={props.indicator?.creationDate}
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
          defaultValue={props.indicator?.modfiedDate}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="modfiedDate" className="rw-field-error" />

        <Label
          name="approvalStatus"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Approval status
        </Label>
        <TextField
          name="approvalStatus"
          defaultValue={props.indicator?.approvalStatus}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="approvalStatus" className="rw-field-error" />

        <Label
          name="actualValue"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Actual value
        </Label>
        <NumberField
          name="actualValue"
          defaultValue={props.indicator?.actualValue}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="actualValue" className="rw-field-error" />

        <Label
          name="currentValue"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Current value
        </Label>
        <NumberField
          name="currentValue"
          defaultValue={props.indicator?.currentValue}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="currentValue" className="rw-field-error" />

        <Label
          name="targetValue"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Target value
        </Label>
        <NumberField
          name="targetValue"
          defaultValue={props.indicator?.targetValue}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="targetValue" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        <NumberField
          name="userId"
          defaultValue={props.indicator?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="departmentId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Department id
        </Label>
        <NumberField
          name="departmentId"
          defaultValue={props.indicator?.departmentId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="departmentId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default IndicatorForm
