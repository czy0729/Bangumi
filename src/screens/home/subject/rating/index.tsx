/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 08:49:27
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { TITLE_RATING } from '../ds'
import { Ctx } from '../types'
import Rating from './rating'
import { memoStyles } from './styles'

export default obc(({ onBlockRef }, { $ }: Ctx) => {
  rerender('Subject.Rating')

  if (!$.showRating[1]) return null

  const { showRating } = systemStore.setting
  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_RATING)} />
      <Rating
        styles={memoStyles()}
        showRating={showRating}
        hideScore={systemStore.setting.hideScore}
      />
    </>
  )
})
