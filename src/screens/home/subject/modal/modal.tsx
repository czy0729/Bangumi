/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-01 09:03:34
 */
import React from 'react'
import { ManageModal } from '@_'
import { memo } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({ visible, disabled, subjectId, name, nameCn, action, onSubmit, onClose }) => {
    rerender('Subject.Modal.Main')

    return (
      <ManageModal
        visible={visible}
        disabled={disabled}
        subjectId={subjectId}
        title={nameCn || name}
        desc={name}
        action={action}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    )
  },
  DEFAULT_PROPS
)
