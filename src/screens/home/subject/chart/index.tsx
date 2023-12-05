/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:36:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 23:34:32
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import Chart from './chart'
import { memoStyles } from './styles'

export default obc((props, { $, navigation }: Ctx) => {
  rerender('Subject.Rating.Chart')

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
