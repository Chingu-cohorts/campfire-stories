import React from 'react';
import { FormGroup } from 'react-bootstrap';

import defaultFields, { makeFields } from 'utils/defaultFields';

const { image, description, title, body } = defaultFields;

const formFields = [
  image,
  description,
  title,
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
