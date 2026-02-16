/*
 * @Author: czy0729
 * @Date: 2022-11-05 22:03:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 04:21:17
 */
import React, { Suspense, useEffect } from 'react'
import { useObserver } from 'mobx-react'
import { feedback } from '@utils'
import { r } from '@utils/dev'
import AntdModal from '../@/ant-design/modal'
import { Text } from '../text'
import { ModalFixed } from './fixed'
import { COMPONENT } from './ds'
import { Props as ModalProps } from './types'

export { ModalProps, ModalFixed }

/** 通用模态框 */
export const Modal = ({
  style,
  visible,
  title,
  type = 'title',
  focus,
  onClose,
  children
}: ModalProps) => {
  r(COMPONENT)

  useEffect(() => {
    if (visible) feedback(true)
  }, [visible])

  return useObserver(() => (
    <AntdModal
      style={style}
      visible={visible}
      focus={focus}
      title={
        !!title && (
          <Text type={type} size={16}>
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
    </AntdModal>
  ))
}

export default Modal
