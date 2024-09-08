/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 20:33:17
 */
import React, { Suspense } from 'react'
import { Component } from '@components'
import { userStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Modal from './modal.lazy'
import { COMPONENT } from './ds'

function ModalWrap(_props, { $ }: Ctx) {
  if (!userStore.isLogin) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-modal'>
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
      </Component>
    </Suspense>
  )
}

export default obc(ModalWrap, COMPONENT)
