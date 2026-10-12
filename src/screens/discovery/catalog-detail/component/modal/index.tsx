/*
 * @Author: czy0729
 * @Date: 2024-08-09 19:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 目录管理弹窗
 */
import { observer } from 'mobx-react'
import { FolderManageModal } from '@_'
import { useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Modal() {
  const { $ } = useStore<Ctx>(COMPONENT)

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

export default observer(Modal)
