/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 06:16:31
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TITLE_RATING } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Rating from './rating'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function RatingWrap({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.showRating[1]) return null

    return (
      <Suspense fallback={null}>
        <Component id='screen-subject-rating'>
          <View
            ref={ref => onBlockRef(ref, TITLE_RATING)}
            style={_.container.layout}
            collapsable={false}
          />
          <Rating
            styles={memoStyles()}
            showRating={systemStore.setting.showRating}
            hideScore={systemStore.setting.hideScore}
          />
          <Split />
        </Component>
      </Suspense>
    )
  })
}

export default RatingWrap
