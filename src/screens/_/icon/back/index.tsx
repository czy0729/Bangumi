/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 10:02:16
 */
import React from 'react'
import { Component, Flex, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as IconBackProps } from './types'

export type { IconBackProps }

export const IconBack = ob(
  ({ navigation, style, color = _.colorPlain, shadow }: IconBackProps) => (
    <Component id='icon-back'>
      <Touchable style={stl(styles.touch, style)} onPress={navigation.goBack}>
        <Flex style={styles.icon} justify='center'>
          <Iconfont name='md-arrow-back' color={color} shadow={shadow} />
        </Flex>
      </Touchable>
    </Component>
  ),
  COMPONENT
)

export default IconBack
