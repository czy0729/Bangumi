/*
 * @Author: czy0729
 * @Date: 2022-08-08 11:59:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 16:14:28
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { useStore } from '@stores'
import { matchYear, matchYearAndMonth } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT, EVENT } from './ds'

function ItemGrid({ item, numColumns }) {
  const { $, navigation } = useStore<Ctx>()
  const { subjectType, showYear } = $.state
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subjectType)
  return (
    <ItemCollectionsGrid
      navigation={navigation}
      num={numColumns}
      type={typeCn}
      event={EVENT}
      {...item}
      airtime={
        showYear ? (typeCn === '动画' ? matchYearAndMonth(item.tip) : matchYear(item.tip)) : false
      }
      isRectangle={typeCn === '音乐'}
      hideScore={false}
    />
  )
}

export default ob(ItemGrid, COMPONENT)
