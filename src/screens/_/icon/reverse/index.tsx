/*
 * @Author: czy0729
 * @Date: 2019-05-13 20:33:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 01:25:42
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Flex, Iconfont, Touchable } from '@components'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as IconReverseProps } from './types'
export type { IconReverseProps }

export const IconReverse = observer(
  ({ style, iconStyle, color, size, children, onPress }: IconReverseProps) => {
    r(COMPONENT)

    return (
      <Component id='icon-reverse'>
        <Touchable style={stl(styles.touch, style)} onPress={onPress}>
          <Flex style={styles.btn} justify='center'>
            <Iconfont style={iconStyle} name='md-sort' size={size} color={color} />
          </Flex>
          {children}
        </Touchable>
      </Component>
    )
  }
)

export default IconReverse
