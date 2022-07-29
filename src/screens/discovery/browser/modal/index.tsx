/*
 * @Author: czy0729
 * @Date: 2022-07-26 22:55:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-26 23:09:00
 */
import React from 'react'
import { ManageModal } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Modal(props, { $ }: Ctx) {
  const { visible, subjectId, title, desc, status, action } = $.state.modal
  const { name, name_cn: nameCn } = $.subject(subjectId)
  return (
    <ManageModal
      visible={visible}
      subjectId={subjectId}
      title={nameCn || name || title}
      desc={name || desc}
      status={status}
      action={action}
      onSubmit={$.doUpdateCollection}
      onClose={$.onCloseManageModal}
    />
  )
}

export default obc(Modal)
