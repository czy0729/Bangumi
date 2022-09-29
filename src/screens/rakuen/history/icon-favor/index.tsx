/*
 * @Author: czy0729
 * @Date: 2019-11-28 21:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:35:11
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

function IconFavor({ $ }: Ctx) {
  const { favor } = $.state
  return (
    <View>
      <SegmentedControl
        key={String($.state._loaded)}
        style={styles.segment}
        size={11}
        values={['收藏', '缓存']}
        selectedIndex={favor ? 0 : 1}
        onValueChange={$.toggleFavor}
      />
      <Heatmap id='本地帖子.切换收藏' />
    </View>
  )
}

export default ob(IconFavor)
