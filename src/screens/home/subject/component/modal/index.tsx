/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 16:29:16
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Modal from './modal'
import { COMPONENT } from './ds'

function ModalWrap(props, { $ }: Ctx) {
  if (!$.isLogin) return null

  return (
    <Modal
      visible={$.state.visible}
      disabled={$.state.disabled}
      subjectId={$.params.subjectId}
      name={$.subject.name}
      nameCn={$.subject.name_cn}
      action={$.action}
      onSubmit={$.doUpdateCollection}
      onClose={$.closeManageModal}
    />
  )
}

export default obc(ModalWrap, COMPONENT)
