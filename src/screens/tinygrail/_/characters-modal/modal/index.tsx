/*
 * @Author: czy0729
 * @Date: 2025-05-03 15:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 23:19:18
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Modal as ModalComp } from '@components'
import { stl } from '@utils'
import { memoStyles } from './styles'

import type { Props } from './types'

function Modal({ visible, title, focus, children, onClose }: Props) {
  const styles = memoStyles()

  return (
    <ModalComp
      style={stl(styles.modal, focus && styles.focus)}
      visible={visible}
      title={title}
      focus={false}
      type='tinygrailPlain'
      onClose={onClose}
    >
      {children}
    </ModalComp>
  )
}

export default observer(Modal)
