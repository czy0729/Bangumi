/*
 * @Author: czy0729
 * @Date: 2025-12-15 17:11:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 17:58:34
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Touchable } from '@components'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Props } from './types'

function OmittedHint({ count, position, onPress }: Props) {
  return useObserver(() => (
    <Touchable onPress={onPress}>
      <View style={styles.omitted}>
        <Text type='sub' size={13}>
          {position === 'top' ? `↑ 还有 ${count} 个条目` : `↓ 还有 ${count} 个条目`}
        </Text>
      </View>
    </Touchable>
  ))
}

export default OmittedHint
