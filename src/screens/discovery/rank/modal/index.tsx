/*
 * @Author: czy0729
 * @Date: 2022-07-22 14:35:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-22 15:27:15
 */
import React from 'react'
import { ManageModal } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Modal(props, { $ }: Ctx) {
  const { visible, subjectId, title, desc } = $.state.modal
  const { name, name_cn: nameCn } = $.subject(subjectId)
  return (
    <ManageModal
      visible={visible}
      subjectId={subjectId}
      title={nameCn || name || title}
      desc={name || desc}
      onSubmit={$.doUpdateCollection}
      onClose={$.onCloseManageModal}
    />
  )
}

export default obc(Modal)
