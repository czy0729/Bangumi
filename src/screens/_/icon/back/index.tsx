/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-10 03:52:31
 */
import React from 'react'
import { Flex, Touchable, Iconfont, Component } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
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
  )
)
