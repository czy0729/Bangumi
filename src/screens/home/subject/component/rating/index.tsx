/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:32:58
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { TITLE_RATING } from '../../ds'
import Split from '../split'
import Rating from './rating'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function RatingWrap({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

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
}

export default observer(RatingWrap)
