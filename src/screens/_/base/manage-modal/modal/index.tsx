/*
 * @Author: czy0729
 * @Date: 2022-11-05 22:03:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-05 23:03:12
 */
import React from 'react'
import AntdModal from '@components/@/ant-design/modal'
import { Text } from '@components'
import { ob } from '@utils/decorators'

function Modal({ style, visible, title, focus, onClose, children }) {
  return (
    <AntdModal
      style={style}
      visible={visible}
      focus={focus}
      title={
        <Text type='title' size={16}>
          {title}
        </Text>
      }
      transparent
      blurView
      closable
      maskClosable
      onClose={onClose}
    >
      {children}
    </AntdModal>
  )
}

export default ob(Modal)
