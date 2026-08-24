/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:13:38
 */
import React, { Suspense } from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { systemStore, useStore } from '@stores'
import { TITLE_RATING } from '../../ds'
import BlockAnchor from '../block-anchor'
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
        <BlockAnchor title={TITLE_RATING} onBlockRef={onBlockRef} />
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
