/*
 * @Author: czy0729
 * @Date: 2022-08-08 11:59:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:03:20
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemCollectionsGrid } from '@_'
import { useStore } from '@stores'
import { matchYear, matchYearAndMonth } from '@utils'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { COMPONENT, EVENT } from './ds'

import type { SubjectTypeCn } from '@types'
import type { Ctx } from '../../../types'
import type { Props } from './types'

function ItemGrid({ item, numColumns }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { subjectType, showYear } = $.state
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subjectType)

  return (
    <ItemCollectionsGrid
      num={numColumns}
      typeCn={typeCn}
      event={EVENT}
      {...item}
      airtime={
        showYear ? (typeCn === '动画' ? matchYearAndMonth(item.tip) : matchYear(item.tip)) : ''
      }
      isRectangle={typeCn === '音乐'}
      hideScore={false}
    />
  )
}

export default observer(ItemGrid)
