/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:58:17
 */
import React from 'react'
import { ManageModal, ManageModalProps } from '@_'
import { memo } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Modal = memo(
  ({
    visible = false,
    disabled = false,
    subjectId = 0,
    name = '',
    nameCn = '',
    action = '看' as ManageModalProps['action'],
    onSubmit = FROZEN_FN,
    onClose = FROZEN_FN
  }) => {
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
