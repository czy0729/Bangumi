/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:36:09
 */
import React from 'react'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import Rating from './rating'
import { memoStyles } from './styles'

export default ob(() => {
  // global.rerender('Subject.Rating')

  const { showRating } = systemStore.setting
  if (showRating === -1) return null

  return (
    <Rating
      styles={memoStyles()}
      showRating={showRating}
      hideScore={systemStore.setting.hideScore}
    />
  )
})
