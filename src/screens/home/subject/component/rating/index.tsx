/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 08:49:27
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_RATING } from '../../ds'
import { Ctx } from '../../types'
import Rating from './rating'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function RatingWrap({ onBlockRef }, { $ }: Ctx) {
  if (!$.showRating[1]) return null

  const { showRating, hideScore } = systemStore.setting
  return (
    <>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_RATING)} />
      <Rating styles={memoStyles()} showRating={showRating} hideScore={hideScore} />
    </>
  )
}

export default obc(RatingWrap, COMPONENT)
