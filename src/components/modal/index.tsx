/*
 * @Author: czy0729
 * @Date: 2022-11-05 22:03:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:03:05
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import AntdModal from '../@/ant-design/modal'
import { Text } from '../text'
import { ModalFixed } from './fixed'
import { COMPONENT } from './ds'
import { Props as ModalProps } from './types'

export { ModalProps, ModalFixed }

/** 通用模态框 */
export const Modal = observer(
  ({ style, visible, title, type = 'title', focus, onClose, children }: ModalProps) => {
    r(COMPONENT)

    return (
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
  }
)
