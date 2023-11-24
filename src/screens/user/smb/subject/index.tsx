/*
 * @Author: czy0729
 * @Date: 2023-11-24 16:11:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 16:17:39
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Manage } from '@_'
import { _, uiStore, collectionStore } from '@stores'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import Title from './title'
import Bottom from './bottom'
import { Ctx } from '../types'

function Subject({ subjectId }, { $ }: Ctx) {
  if (!subjectId) return null

  const { jp, cn, type, eps = 0, rank, rating } = $.subjectV2(subjectId)
  const { status = { name: '' } } = $.collection(subjectId)
  const collection = collectionStore.collect(subjectId) || status.name

  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
  let action = '看'
  if (typeCn === '书籍') action = '读'
  if (typeCn === '音乐') action = '听'
  if (typeCn === '游戏') action = '玩'

  return (
    <Flex align='start'>
      <Flex.Item>
        <Title name={jp} nameCn={cn} />
        <Text style={_.mt.sm} size={11} bold numberOfLines={2}>
          {!!eps && `${eps}话 / `}
          {$.airDate(subjectId) || '-'}
        </Text>
        <Bottom rank={rank} rating={rating} />
      </Flex.Item>
      <Manage
        collection={collection}
        typeCn={typeCn}
        subjectId={subjectId}
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
    </Flex>
  )
}

export default obc(Subject)
