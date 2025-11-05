/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 03:15:32
 */
import React from 'react'
import { Component, Flex, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as IconBackProps } from './types'

export { IconBackProps }

export const IconBack = ob(
  ({ navigation, style, color = _.colorPlain }: IconBackProps) => (
    <Component id='icon-back'>
      <Touchable style={stl(styles.touch, style)} onPress={navigation.goBack}>
        <Flex style={styles.icon} justify='center'>
          <Iconfont name='md-arrow-back' color={color} />
        </Flex>
      </Touchable>
    </Component>
  ),
  COMPONENT
)

export default IconBack
