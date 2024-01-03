/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 00:59:53
 */
import React from 'react'
import { ManageModal } from '@_'
import { memo } from '@utils/decorators'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Modal = memo(
  ({ visible, disabled, subjectId, name, nameCn, action, onSubmit, onClose }) => {
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
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Modal
