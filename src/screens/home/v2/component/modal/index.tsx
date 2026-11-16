/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:22:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-16 07:11:12
 */
import { observer } from 'mobx-react'
import { ManageModal } from '@_'
import { useStore } from '@stores'
import { getAction } from '@utils'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { SubjectTypeCn } from '@types'

function Modal() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { subjectId } = $.state
  const { name, name_cn: nameCn } = $.subject(subjectId)

  return (
    <ManageModal
      visible={$.state.visible}
      subjectId={subjectId}
      title={nameCn || name || $.state.modal.title}
      desc={name || $.state.modal.desc}
      action={
        $.state.modal.action ||
        getAction(MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>($.subject(subjectId).type))
      }
      flipOnSubmit
      onSubmit={$.doUpdateCollection}
      onClose={$.closeManageModal}
    />
  )
}

export default observer(Modal)
