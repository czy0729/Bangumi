/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 23:35:02
 */
import React from 'react'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import Rating from './rating'
import { styles } from './styles'

export default ob(() => {
  global.rerender('Subject.Rating')

  const { showRating } = systemStore.setting
  if (showRating === -1) return null

  return (
    <Rating
      styles={styles}
      showRating={showRating}
      hideScore={systemStore.setting.hideScore}
    />
  )
})
