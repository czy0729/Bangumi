/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 10:53:39
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Modal from './modal'

export default obc((props, { $ }: Ctx) => {
  global.rerender('Subject.Modal')

  if (!$.isLogin) return null

  return (
    <Modal
      visible={$.state.visible}
      subjectId={$.params.subjectId}
      name={$.subject.name}
      nameCn={$.subject.name_cn}
      action={$.action}
      onSubmit={$.doUpdateCollection}
      onClose={$.closeManageModal}
    />
  )
})
