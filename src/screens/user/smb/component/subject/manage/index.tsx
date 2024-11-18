/*
 * @Author: czy0729
 * @Date: 2023-11-29 03:02:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:31:05
 */
import React from 'react'
import { Manage as ManageComp } from '@_'
import { collectionStore, uiStore, userStore, useStore } from '@stores'
import { cnjp } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'

function Manage({ subjectId }) {
  const { $ } = useStore<Ctx>()
  if (!subjectId) return null

  const { jp, cn, type } = $.subjectV2(subjectId)
  const { status = { name: '' } } = $.collection(subjectId)
  const collection = collectionStore.collect(subjectId) || status.name

  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
  let action = '看'
  if (typeCn === '书籍') action = '读'
  if (typeCn === '音乐') action = '听'
  if (typeCn === '游戏') action = '玩'

  return (
    <ManageComp
      collection={collection}
      typeCn={typeCn}
      subjectId={subjectId}
      showRedirect={!userStore.isStorybookLogin}
      onPress={() => {
        uiStore.showManageModal(
          {
            subjectId,
            title: cnjp(jp, cn),
            desc: cnjp(cn, jp),
            status: collection,
            action
          },
          '本地管理',
          () => {
            collectionStore.fetchCollectionStatusQueue([subjectId])
          }
        )
      }}
    />
  )
}

export default ob(Manage)
