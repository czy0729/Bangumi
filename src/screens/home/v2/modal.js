/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:22:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-16 10:12:40
 */
import React from 'react'
import { ManageModal } from '@screens/_'
import { obc } from '@utils/decorators'

function Modal(props, { $ }) {
  rerender('Home.Modal')

  const { visible, subjectId, modal = {} } = $.state
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
