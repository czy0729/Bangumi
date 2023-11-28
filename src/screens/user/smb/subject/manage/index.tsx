/*
 * @Author: czy0729
 * @Date: 2023-11-29 03:02:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 03:03:09
 */
import React from 'react'
import { Manage as ManageComp } from '@_'
import { uiStore, collectionStore, userStore } from '@stores'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'

function Manage({ subjectId }, { $ }: Ctx) {
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

export default obc(Manage)
