/*
 * @Author: czy0729
 * @Date: 2019-11-28 21:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-27 08:45:20
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Heatmap } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

function IconFavor({ $ }: Ctx) {
  return (
    <View style={$.favorCount ? styles.withCollect : _.mr.xs}>
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
  )
}

export default ob(IconFavor)
