/*
 * @Author: czy0729
 * @Date: 2022-08-08 11:59:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 16:14:28
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { matchYear, matchYearAndMonth } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT, EVENT } from './ds'

function ItemGrid({ item, numColumns }, { $, navigation }: Ctx) {
  const { subjectType, showYear } = $.state
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subjectType)
  return (
    <ItemCollectionsGrid
      navigation={navigation}
      num={numColumns}
      type={typeCn}
      event={EVENT}
      {...item}
      isRectangle={typeCn === '音乐'}
      airtime={
        showYear ? (typeCn === '动画' ? matchYearAndMonth(item.tip) : matchYear(item.tip)) : false
      }
    />
  )
}

export default obc(ItemGrid, COMPONENT)
