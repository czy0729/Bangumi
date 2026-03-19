/*
 * @Author: czy0729
 * @Date: 2024-08-21 05:16:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 01:13:45
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as IconNavigateProps } from './types'
export type { IconNavigateProps }

export const IconNavigate = observer(({ onPress }: IconNavigateProps) => {
  r(COMPONENT)

  return (
    <Touchable style={styles.touch} onPress={onPress}>
      <Flex>
        <Text type='sub'>更多</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
    </Touchable>
  )
})

export default IconNavigate
