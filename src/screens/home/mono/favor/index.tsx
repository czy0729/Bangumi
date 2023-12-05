/*
 * @Author: czy0729
 * @Date: 2021-11-27 07:01:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 19:26:54
 */
import React from 'react'
import { Touchable, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import { styles } from './styles'

function Favor({ $ }: Ctx) {
  rerender('Mono.Favor')

  const { collectUrl, eraseCollectUrl } = $.mono
  if (collectUrl) {
    return (
      <Touchable style={styles.touch} onPress={$.doCollect}>
        <Iconfont size={20} name='md-favorite-outline' color={_.colorTitle} />
        <Heatmap id='人物.收藏人物' />
        <Heatmap right={52} id='人物.取消收藏人物' transparent />
      </Touchable>
    )
  }

  if (eraseCollectUrl) {
    return (
      <Touchable style={styles.touch} onPress={$.doEraseCollect}>
        <Iconfont size={20} name='md-favorite' color={_.colorMain} />
        <Heatmap id='人物.取消收藏人物' />
      </Touchable>
    )
  }

  return null
}

export default ob(Favor)
