/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:32:40
 */
import React, { Suspense } from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { userStore, useStore } from '@stores'
import Modal from './modal'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ModalWrap() {
  const { $ } = useStore<Ctx>(COMPONENT)

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

export default observer(ModalWrap)
