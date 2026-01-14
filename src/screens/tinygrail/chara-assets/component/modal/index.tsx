/*
 * @Author: czy0729
 * @Date: 2025-04-06 07:50:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-25 22:16:29
 */
import React from 'react'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailCharactersModal from '@tinygrail/_/characters-modal'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Modal() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <TinygrailCharactersModal
      visible={$.state.visible}
      title={$.state.title}
      rightItemId={$.state.monoId}
      onClose={$.onCloseModal}
      onSubmit={$.doUse}
    />
  ))
}

export default Modal
