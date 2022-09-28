/*
 * @Author: czy0729
 * @Date: 2019-11-28 21:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-28 16:07:48
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'

function IconFavor({ $ }: Ctx) {
  return (
    <IconHeader
      style={_.mr.xs}
      name={$.isFavor ? 'md-star' : 'md-star-outline'}
      color={$.isFavor ? _.colorYellow : _.colorDesc}
      onPress={$.setFavor}
    >
      <Heatmap right={33} bottom={7} id='帖子.设置收藏' />
    </IconHeader>
  )
}

export default ob(IconFavor)
