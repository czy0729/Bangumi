/*
 * @Author: czy0729
 * @Date: 2024-07-01 07:23:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-09 23:47:56
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { IconHeader } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Favor() {
  const { $ } = useStore<Ctx>()
  return (
    <View style={$.favorCount ? styles.withCollect : _.mr.xs}>
      <IconHeader
        name={$.isFavor ? 'md-star' : 'md-star-outline'}
        color={$.isFavor ? _.colorYellow : _.colorDesc}
        onPress={$.setFavor}
      />
      {!!$.favorCount && (
        <Text style={styles.num} size={10} bold>
          {$.favorCount}
        </Text>
      )}
    </View>
  )
}

export default ob(Favor, COMPONENT)
