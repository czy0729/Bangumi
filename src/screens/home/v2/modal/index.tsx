/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:22:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-21 14:28:25
 */
import React from 'react'
import { ManageModal } from '@_'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'

function Modal(props, { $ }: Ctx) {
  rerender('Home.Modal')

  const { visible, subjectId, modal } = $.state
  const { name, name_cn: nameCn } = $.subject(subjectId)
  return (
    <ManageModal
      visible={visible}
      subjectId={subjectId}
      title={nameCn || name || modal.title}
      desc={name || modal.desc}
      onSubmit={$.doUpdateCollection}
      onClose={$.closeManageModal}
    />
  )
}

export default obc(Modal)
