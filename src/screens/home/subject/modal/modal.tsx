/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 10:54:24
 */
import React from 'react'
import { ManageModal } from '@_'
import { memo } from '@utils/decorators'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({ visible, subjectId, name, nameCn, action, onSubmit, onClose }) => {
    global.rerender('Subject.Modal.Main')

    return (
      <ManageModal
        visible={visible}
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
