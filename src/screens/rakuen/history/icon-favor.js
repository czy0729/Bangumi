/*
 * @Author: czy0729
 * @Date: 2019-11-28 21:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 21:03:51
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function IconFavor({ $ }) {
  const { favor } = $.state
  return (
    <IconHeader
      name={favor ? 'star-full' : 'star'}
      color={favor ? _.colorYellow : _.colorDesc}
      onPress={$.toggleFavor}
    >
      <Heatmap id='本地帖子.切换收藏' />
    </IconHeader>
  )
}

export default ob(IconFavor)
