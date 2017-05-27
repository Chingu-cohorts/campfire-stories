import React from 'react'
import classnames from 'classnames'

export const renderField = (field) => {
  return (
    <div className={classnames('form-group', {'has-error': field.meta.visited && field.meta.invalid})}>
        <label className="control-label " htmlFor="text">{ field.label }</label>
        <input {...field.input} className="form-control create-story-inputs" id={field.id} name={field.name} placeholder={field.placeholder} type={field.type} />
        {field.meta.touched && field.meta.error && <div className="text-danger"> {field.meta.error} </div>}
    </div>
  )
}

export const RenderAlert = ({ errorMessage }) => {
  if(errorMessage) {
    return (
      <div className="alert alert-danger">
        <span><strong>Error!</strong> {errorMessage}</span>
      </div>
    );
  } else {
    return null;
  }
}
