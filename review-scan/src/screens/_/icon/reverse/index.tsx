/*
 * @Author: czy0729
 * @Date: 2019-05-13 20:33:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 04:20:19
 */
import React from 'react'
import { Component, Flex, Iconfont, Touchable } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as IconReverseProps } from './types'

export { IconReverseProps }

export const IconReverse = ob(
  ({ style, iconStyle, color, size, children, onPress }: IconReverseProps) => (
    <Component id='icon-reverse'>
      <Touchable style={stl(styles.touch, style)} onPress={onPress}>
        <Flex style={styles.btn} justify='center'>
          <Iconfont style={iconStyle} name='md-sort' size={size} color={color} />
        </Flex>
        {children}
      </Touchable>
    </Component>
  ),
  COMPONENT
)

export default IconReverse
