/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:22:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:52:55
 */
import React from 'react'
import { ManageModal } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Modal() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { subjectId } = $.state
    const { name, name_cn: nameCn } = $.subject(subjectId)

    return (
      <ManageModal
        visible={$.state.visible}
        subjectId={subjectId}
        title={nameCn || name || $.state.modal.title}
        desc={name || $.state.modal.desc}
        onSubmit={$.doUpdateCollection}
        onClose={$.closeManageModal}
      />
    )
  })
}

export default Modal
