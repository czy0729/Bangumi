/*
 * @Author: czy0729
 * @Date: 2021-11-27 07:01:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-10 04:32:29
 */
import React from 'react'
import { Heatmap, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Favor({ $ }: Ctx) {
  if ($.mono.collectUrl) {
    return (
      <Touchable style={styles.touch} onPress={$.doCollect}>
        <Iconfont size={20} name='md-favorite-outline' color={_.colorTitle} />
        <Heatmap id='人物.收藏人物' />
        <Heatmap right={52} id='人物.取消收藏人物' transparent />
      </Touchable>
    )
  }

  if ($.mono.eraseCollectUrl) {
    return (
      <Touchable style={styles.touch} onPress={$.doEraseCollect}>
        <Iconfont size={20} name='md-favorite' color={_.colorMain} />
        <Heatmap id='人物.取消收藏人物' />
      </Touchable>
    )
  }

  return null
}

export default ob(Favor, COMPONENT)
