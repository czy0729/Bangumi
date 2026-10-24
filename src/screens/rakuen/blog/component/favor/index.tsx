/*
 * @Author: czy0729
 * @Date: 2024-07-01 07:23:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 11:00:00
 *
 * 头部收藏按钮与收藏人数
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { IconHeader } from '@_'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Favor() {
  const { $ } = useStore<Ctx>(COMPONENT)

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

export default observer(Favor)
