/*
 * @Author: czy0729
 * @Date: 2022-11-05 22:03:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-24 07:16:14
 */
import React, { Suspense, useEffect } from 'react'
import { useObserver } from 'mobx-react'
import { AntmModal } from '@components/@/ant-design/modal'
import { feedback } from '@utils'
import { r } from '@utils/dev'
import { Text } from '../text'
import { ModalFixed } from './fixed'
import { COMPONENT } from './ds'

import type { Props as ModalProps } from './types'

export { ModalFixed }

export type { ModalProps }

/** 通用模态框 */
export function Modal({
  style,
  visible,
  title,
  type = 'title',
  focus,
  onClose,
  children
}: ModalProps) {
  r(COMPONENT)

  useEffect(() => {
    if (visible) feedback(true)
  }, [visible])

  return useObserver(() => (
    <AntmModal
      style={style}
      visible={visible}
      focus={focus}
      title={
        !!title && (
          <Text type={type} size={16} numberOfLines={5}>
            {title}
          </Text>
        )
      }
      transparent
      closable
      maskClosable
      onClose={onClose}
    >
      <Suspense>{children}</Suspense>
    </AntmModal>
  ))
}

export default Modal
