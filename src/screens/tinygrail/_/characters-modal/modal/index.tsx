/*
 * @Author: czy0729
 * @Date: 2025-05-03 15:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-14 21:42:51
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Modal as ModalComp } from '@components'
import { stl } from '@utils'
import Information from '../information'
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
      right={<Information title={title} onClose={onClose} />}
      onClose={onClose}
    >
      {children}
    </ModalComp>
  )
}

export default observer(Modal)
