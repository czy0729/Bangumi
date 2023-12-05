/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-01 09:04:03
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import Modal from './modal'

export default obc((props, { $ }: Ctx) => {
  rerender('Subject.Modal')

  if (!$.isLogin) return null

  const { visible, disabled } = $.state
  return (
    <Modal
      visible={visible}
      disabled={disabled}
      subjectId={$.params.subjectId}
      name={$.subject.name}
      nameCn={$.subject.name_cn}
      action={$.action}
      onSubmit={$.doUpdateCollection}
      onClose={$.closeManageModal}
    />
  )
})
