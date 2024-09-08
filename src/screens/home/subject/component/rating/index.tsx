/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 19:46:39
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_RATING } from '../../ds'
import { Ctx } from '../../types'
import Rating from './rating.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function RatingWrap({ onBlockRef }, { $ }: Ctx) {
  if (!$.showRating[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-rating'>
        <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_RATING)} />
        <Rating
          styles={memoStyles()}
          showRating={systemStore.setting.showRating}
          hideScore={systemStore.setting.hideScore}
        />
      </Component>
    </Suspense>
  )
}

export default obc(RatingWrap, COMPONENT)
