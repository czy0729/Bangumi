/*
 * @Author: czy0729
 * @Date: 2024-08-09 19:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 19:57:06
 */
import React from 'react'
import { FolderManageModal } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Modal(_props, { $ }: Ctx) {
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

export default obc(Modal, COMPONENT)
