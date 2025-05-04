/*
 * @Author: czy0729
 * @Date: 2025-04-06 07:50:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-02 22:47:51
 */
import React from 'react'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import CharactersModal from '@screens/tinygrail/_/characters-modal'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Modal() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <CharactersModal
      visible={$.state.visible}
      title={$.state.title}
      rightItemId={$.state.monoId}
      onClose={$.onCloseModal}
      onSubmit={$.doUse}
    />
  ))
}

export default Modal
