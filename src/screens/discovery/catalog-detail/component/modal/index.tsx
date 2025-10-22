/*
 * @Author: czy0729
 * @Date: 2024-08-09 19:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 01:17:13
 */
import React from 'react'
import { FolderManageModal } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Modal() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <FolderManageModal
      id={$.catalogId}
      visible={$.state.visible}
      defaultExpand={$.catalogId}
      defaultEditItem={$.state.defaultEditItem}
      onClose={$.onClose}
    />
  ))
}

export default Modal
