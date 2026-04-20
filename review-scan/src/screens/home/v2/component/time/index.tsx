/*
 * @Author: czy0729
 * @Date: 2024-03-26 18:00:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-27 05:16:57
 */
import React from 'react'
import { Text } from '@components'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Time({ value }: { value: string }) {
  return (
    <Text
      style={[
        styles.time,
        {
          bottom: systemStore.setting.homeListCompact ? 4 : 8
        }
      ]}
      type='sub'
      size={12}
    >
      {value} 在玩
    </Text>
  )
}

export default ob(Time, COMPONENT)
