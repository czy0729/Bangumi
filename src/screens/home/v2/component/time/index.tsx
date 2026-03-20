/*
 * @Author: czy0729
 * @Date: 2024-03-26 18:00:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:41:09
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function Time({ value }: Props) {
  r(COMPONENT)

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

export default observer(Time)
