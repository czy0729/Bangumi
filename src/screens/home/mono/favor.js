/*
 * @Author: czy0729
 * @Date: 2021-11-27 07:01:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-27 07:11:17
 */
import React from 'react'
import { Touchable, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Favor({ $ }) {
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

const styles = _.create({
  touch: {
    paddingHorizontal: _.sm,
    marginRight: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
