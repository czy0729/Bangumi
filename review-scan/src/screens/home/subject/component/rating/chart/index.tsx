/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:36:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:05:08
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import Chart from './chart'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ChartWrap() {
  const { $, navigation } = useStore<Ctx>()
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

export default ob(ChartWrap, COMPONENT)
