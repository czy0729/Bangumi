/*
 * @Author: czy0729
 * @Date: 2019-11-28 21:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-24 15:01:04
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function IconFavor({ $ }) {
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

const styles = _.create({
  segment: {
    width: _.r(96),
    height: _.r(28),
    marginRight: _.sm
  }
})
