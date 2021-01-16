/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:21:28
 */
import React from 'react'
import { ManageModal } from '@screens/_'
import { obc } from '@utils/decorators'

function Modal(props, { $ }) {
  const { visible } = $.state
  const { name_cn: nameCn, name } = $.subject
  return (
    <ManageModal
      visible={visible}
      subjectId={$.params.subjectId}
      title={nameCn || name}
      desc={name}
      action={$.action}
      onSubmit={$.doUpdateCollection}
      onClose={$.closeManageModal}
    />
  )
}

export default obc(Modal)
