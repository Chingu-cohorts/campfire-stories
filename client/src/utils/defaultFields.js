import React from 'react';
import { Field } from 'redux-form';
import { renderField } from 'components/utils/formFields';
import { renderTextarea } from 'components/utils/textareaField';

export const makeFields = fieldArr => fieldArr.map((fieldProps, i) =>
  <Field key={fieldProps.name} tabIndex={i + 1} {...fieldProps} />
);

export default {
  image: {
    name: 'image',
    type: 'url',
    label: 'Image',
    placeholder: 'Include an image URL for your header',
    component: renderField
  },
  text: {
    name: 'text',
    type: 'text',
    label: 'Text',
    placeholder: 'Text',
    component: renderField
  },
  body: {
    name: 'body',
    type: 'text',
    label: 'Story',
    placeholder: 'Tell people about yourself, how you got started with FCC, and what you hope to achieve. Or something.',
    component: renderTextarea,
    rows: 10,
    cols: 40
  },
  password: {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
    component: renderField,
    className: 'form-control'
  },
  email: {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'Email',
    component: renderField,
    className: 'form-control'
  },
  name: {
    name: 'Name',
    type: 'text',
    label: 'Name',
    placeholder: 'Name',
    component: renderField,
    className: 'form-control'    
  }
};
