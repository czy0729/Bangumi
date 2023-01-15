/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-18 15:32:00
 */
import React from 'react'
import { Flex, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { styles } from './styles'
import { Props as IconBackProps } from './types'

export { IconBackProps }

export const IconBack = ob(
  ({ navigation, style, color = _.colorPlain }: IconBackProps) => (
    <Touchable
      style={style ? [styles.touch, style] : styles.touch}
      onPress={navigation.goBack}
    >
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-arrow-back' color={color} />
      </Flex>
    </Touchable>
  )
)
