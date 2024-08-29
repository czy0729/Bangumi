/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:22:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 17:20:17
 */
import React from 'react'
import { ManageModal } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Modal(_props, { $ }: Ctx) {
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
}

export default obc(Modal, COMPONENT)
