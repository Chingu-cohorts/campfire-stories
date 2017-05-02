import React from 'react';
import { FormGroup } from 'react-bootstrap';

import defaultFields, { makeFields } from 'utils/defaultFields';

const { image, title, body } = defaultFields;

const formFields = [
  image,
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
