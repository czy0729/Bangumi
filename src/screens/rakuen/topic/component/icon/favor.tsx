/*
 * @Author: czy0729
 * @Date: 2019-11-28 21:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 04:51:57
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Heatmap, Text } from '@components'
import { IconHeader } from '@_'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Icon() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <View style={[styles.favor, $.favorCount ? styles.withCollect : _.mr.xs]}>
      <IconHeader
        name={$.isFavor ? 'md-star' : 'md-star-outline'}
        color={$.isFavor ? _.colorYellow : _.colorDesc}
        onPress={$.setFavor}
      >
        <Heatmap right={33} bottom={7} id='帖子.设置收藏' />
      </IconHeader>
      {!!$.favorCount && (
        <Text style={styles.num} size={10} bold>
          {$.favorCount}
        </Text>
      )}
    </View>
  ))
}

export default Icon
