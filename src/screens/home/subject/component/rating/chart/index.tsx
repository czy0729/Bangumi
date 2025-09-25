/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:36:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:05:08
 */
import React from 'react'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import Chart from './chart'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ChartWrap() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default ChartWrap
