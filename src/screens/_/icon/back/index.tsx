/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 21:43:49
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Flex, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as IconBackProps } from './types'
export type { IconBackProps }

export const IconBack = observer(
  ({ navigation, style, color = _.colorPlain, shadow }: IconBackProps) => {
    r(COMPONENT)

    return (
      <Component id='icon-back'>
        <Touchable style={stl(styles.touch, style)} onPress={navigation.goBack}>
          <Flex style={styles.icon} justify='center'>
            <Iconfont name='md-arrow-back' color={color} shadow={shadow} />
          </Flex>
        </Touchable>
      </Component>
    )
  }
)

export default IconBack
