/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:36:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:33:11
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import Chart from './chart'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function ChartWrap() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { total, count, score } = $.rating

  return (
    <Chart
      navigation={navigation}
      styles={memoStyles()}
      friend={$.subjectFormHTML.friend}
      rating={$.collection.rating}
      total={total}
      count={count}
      score={score}
      toRating={$.toRating}
    />
  )
}

export default observer(ChartWrap)
