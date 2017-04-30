import React from 'react';
import { FormGroup } from 'react-bootstrap';
import { Field } from 'redux-form';

import { renderField } from 'components/utils/formFields'
import { renderTextarea } from 'components/utils/textareaField'

const ContentForm = () => (
  <FormGroup>
    <Field key={1}
      id="text" name="image" placeholder="Include an image URL for your header"
      type="url" label="Image" component={renderField} />

    <Field key={2}
      id="text1" name="description" placeholder="Briefly describe the image" type="text"
      label="Description of image" component={renderField} />

    <Field key={3}
      id="text2" name="title" placeholder="Title" type="text"
      label="Title" component={renderField} />

    <Field key={4}
      cols="40" id="textarea" name="body" rows="10"
      placeholder="Tell people about yourself, how you got started with FCC, and what you hope to achieve. Or something."
      type="text" label="Story" component={renderTextarea} />
  </FormGroup>
);

export default ContentForm
