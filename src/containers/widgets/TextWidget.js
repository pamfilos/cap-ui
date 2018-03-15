import React from 'react';

import Box from 'grommet/components/Box';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';

// const TextWidget = function(props) {
//   // TOFIX onBlur, onFocus
//   let _onChange = function _onChange(_ref) {
//     var value = _ref.target.value;
//     return props.onChange( value);
//   };

//   return (
//     <Box flex={true}>
//     <FormField
//       label={props.label}
//       help={props.schema.description}>
//       <TextInput id='item1'
//         name='item-1'
//         placeHolder={props.placeholder}
//         onDOMChange={_onChange}
//         onBlur={props.onBlur}
//         value={props.value}/>
//     </FormField>
//     </Box>
//   );
// };

const TextWidget = function(props) {
  // TOFIX onBlur, onFocus
  let _onChange = function _onChange(_ref) {
    var value = _ref.target.value;
    return props.onChange( value ? value : "");
  };

  return (
    <Box flex={true} pad={{"horizontal": "medium"}}>
      <TextInput id='item1'
        name='item-1'
        placeHolder={props.placeholder}
        onDOMChange={_onChange}
        onBlur={props.onBlur}
        value={props.value ? props.value : ""}/>
    </Box>
  );
};



export default TextWidget;