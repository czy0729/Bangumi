/*
 * @Author: czy0729
 * @Date: 2024-08-09 19:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:23:06
 */
import React from 'react'
import { FolderManageModal } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Modal() {
  const { $ } = useStore<Ctx>()
  return (
    <FolderManageModal
      id={$.catalogId}
      visible={$.state.visible}
      defaultExpand={$.catalogId}
      defaultEditItem={$.state.defaultEditItem}
      onClose={$.onClose}
    />
  )
}

export default ob(Modal, COMPONENT)
