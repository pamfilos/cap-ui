import React from 'react';

import {
  Box,
  Button
} from 'grommet';

import FormTrashIcon from 'grommet/components/icons/base/FormTrash';
import FormUpIcon from 'grommet/components/icons/base/FormUp';
import FormDownIcon from 'grommet/components/icons/base/FormDown';

let ArrayUtils = function (props) {
  const {
    hasRemove, hasMoveDown, hasMoveUp,
    onDropIndexClick, onReorderClick, index
  } = props;
  return (
    <Box direction="row" justify="between">
      <Button
      margin="none" pad="none"
        onClick={hasRemove ? onDropIndexClick(index) : null}
        icon={<FormTrashIcon margin="none" pad="none" />} />
      <Button
        onClick={hasMoveDown ? onReorderClick(index, index+1) : null}
        icon={<FormDownIcon margin="none" pad="none" />} />
      <Button
        onClick={hasMoveUp ? onReorderClick(index, index-1) : null}
        icon={<FormUpIcon margin="none" pad="none" />} />
    </Box>
  );
};

export default ArrayUtils;