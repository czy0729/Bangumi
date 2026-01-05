/*
 * @Author: czy0729
 * @Date: 2024-07-01 07:23:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-05 05:47:06
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { IconHeader } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Favor() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
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
  ))
}

export default Favor
