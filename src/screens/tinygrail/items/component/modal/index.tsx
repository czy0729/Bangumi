/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:31:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:34:57
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { tinygrailStore, useStore } from '@stores'
import CharactersModal from '@tinygrail/_/characters-modal'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Modal() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleSubmit = useCallback(
    (params1: any, params2?: any) => {
      if (tinygrailStore.checkAuth()) $.doUse(params1, params2)
    },
    [$]
  )

  return (
    <CharactersModal
      visible={$.state.visible}
      title={$.state.title}
      onClose={$.onCloseModal}
      onSubmit={handleSubmit}
    />
  )
}

export default observer(Modal)
