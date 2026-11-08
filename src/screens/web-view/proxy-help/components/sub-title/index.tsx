/*
 * @Author: czy0729
 * @Date: 2026-06-21 02:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * 带竖线标识的副标题
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { stl } from '@utils'
import { memoStyles } from './styles'

import type { Props } from './types'

/** 副标题 */
function SubTitle({ style, children }: Props) {
  const styles = memoStyles()

  return (
    <View style={stl(styles.container, style)}>
      <View style={styles.indicator} />
      <Text size={15} lineHeight={18} bold>
        {children}
      </Text>
    </View>
  )
}

export default observer(SubTitle)
