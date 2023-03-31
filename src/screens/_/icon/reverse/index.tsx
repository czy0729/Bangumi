/*
 * @Author: czy0729
 * @Date: 2019-05-13 20:33:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-31 07:27:07
 */
import React from 'react'
import { Flex, Touchable, Iconfont } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { styles } from './styles'
import { Props as IconReverseProps } from './types'

export { IconReverseProps }

export const IconReverse = ob(
  ({ style, iconStyle, color, size, children, onPress }: IconReverseProps) => (
    <Touchable style={stl(styles.touch, style)} onPress={onPress}>
      <Flex style={styles.btn} justify='center'>
        <Iconfont style={iconStyle} name='md-sort' size={size} color={color} />
      </Flex>
      {children}
    </Touchable>
  )
)
