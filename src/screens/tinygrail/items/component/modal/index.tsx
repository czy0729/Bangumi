/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:31:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-26 01:32:10
 */
import React from 'react'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import CharactersModal from '@tinygrail/_/characters-modal'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Modal() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <CharactersModal
      visible={$.state.visible}
      title={$.state.title}
      onClose={$.onCloseModal}
      onSubmit={$.doUse}
    />
  ))
}

export default Modal
