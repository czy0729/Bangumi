/*
 * @Author: czy0729
 * @Date: 2024-08-21 05:16:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 05:23:58
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as IconNavigateProps } from './types'

export { IconNavigateProps }

export const IconNavigate = ob(
  ({ onPress }: IconNavigateProps) => (
    <Touchable style={styles.touch} onPress={onPress}>
      <Flex>
        <Text type='sub'>更多</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
    </Touchable>
  ),
  COMPONENT
)

export default IconNavigate
