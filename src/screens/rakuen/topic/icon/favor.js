/*
 * @Author: czy0729
 * @Date: 2019-11-28 21:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 19:30:40
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function IconFavor({ $ }) {
  return (
    <IconHeader
      style={styles.icon}
      name={$.isFavor ? 'star-full' : 'star'}
      color={$.isFavor ? _.colorYellow : _.colorDesc}
      onPress={$.setFavor}
    >
      <Heatmap right={33} bottom={7} id='帖子.设置收藏' />
    </IconHeader>
  )
}

export default ob(IconFavor)

const styles = _.create({
  icon: {
    marginRight: -2
  }
})
