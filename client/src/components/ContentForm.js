import React from 'react';
import { FormGroup } from 'react-bootstrap';

import defaultFields, { makeFields } from 'utils/defaultFields';

const { image, text, body } = defaultFields;

const formFields = [
  image,
  {
    ...text,
    name: 'title',
    placeholder: 'Title',
    label: 'Title'
  },
  body
];

const ContentForm = () => {
  const form = makeFields(formFields);

  return (
    <FormGroup>
      {form}
    </FormGroup>
  );
};

export default ContentForm;
