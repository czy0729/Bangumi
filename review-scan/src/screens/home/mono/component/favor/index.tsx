/*
 * @Author: czy0729
 * @Date: 2021-11-27 07:01:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 19:50:41
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Heatmap, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Favor() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
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
  })
}

export default Favor
