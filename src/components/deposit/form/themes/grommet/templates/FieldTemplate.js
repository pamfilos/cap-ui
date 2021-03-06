import React from 'react';

import FormField from 'grommet/components/FormField';

let FieldTemplate = function (props) {
  const {id, label, description, rawErrors=[], children} = props;
  let _errors = null;

  if (rawErrors.length > 0)
    _errors = rawErrors.map((error, index) => <span key={index}>{error}</span>);

  if ( ["array", "object"].indexOf(props.schema.type) > -1) {
    return (
      <span>{children}</span>
    );
  }

  return (
    <FormField
      help={description ? description : null}
      label={label}
      key={id+label}
      error={_errors}>
      {children}
    </FormField>
  );
};


export default FieldTemplate;