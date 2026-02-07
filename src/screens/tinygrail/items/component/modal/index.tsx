/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:31:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 07:54:16
 */
import React, { useCallback } from 'react'
import { tinygrailStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import CharactersModal from '@tinygrail/_/characters-modal'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Modal() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleSubmit = useCallback(
    (params1: any, params2: any) => {
      if (tinygrailStore.checkAuth()) $.doUse(params1, params2)
    },
    [$]
  )

  return useObserver(() => (
    <CharactersModal
      visible={$.state.visible}
      title={$.state.title}
      onClose={$.onCloseModal}
      onSubmit={handleSubmit}
    />
  ))
}

export default Modal
