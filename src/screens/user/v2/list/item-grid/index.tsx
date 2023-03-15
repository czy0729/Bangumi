/*
 * @Author: czy0729
 * @Date: 2022-08-08 11:59:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-15 20:21:10
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { matchYear, matchYearAndMonth } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'

const EVENT = {
  id: '我的.跳转',
  type: 'grid'
} as const

function ItemGrid({ item, numColumns }, { $, navigation }: Ctx) {
  const { subjectType, showYear } = $.state
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subjectType)
  return (
    <ItemCollectionsGrid
      navigation={navigation}
      num={numColumns}
      type={typeCn}
      userCollection={$.label}
      event={EVENT}
      {...item}
      isRectangle={typeCn === '音乐'}
      airtime={
        showYear
          ? typeCn === '动画'
            ? matchYearAndMonth(item.tip)
            : matchYear(item.tip)
          : false
      }
    />
  )
}

export default obc(ItemGrid)
