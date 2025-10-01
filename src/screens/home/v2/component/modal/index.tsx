/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:22:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-01 21:50:41
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { ManageModal } from '@_'
import { useStore } from '@stores'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

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
