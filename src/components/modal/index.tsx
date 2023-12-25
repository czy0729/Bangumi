/*
 * @Author: czy0729
 * @Date: 2022-11-05 22:03:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-25 13:24:33
 */
import React from 'react'
import { observer } from 'mobx-react'
import AntdModal from '../@/ant-design/modal'
import { Text } from '../text'
import { ModalFixed } from './fixed'
import { Props as ModalProps } from './types'

export { ModalProps, ModalFixed }

/** 通用模态框 */
export const Modal = observer(
  ({ style, visible, title, type = 'title', focus, onClose, children }: ModalProps) => (
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
      {children}
    </AntdModal>
  )
)
