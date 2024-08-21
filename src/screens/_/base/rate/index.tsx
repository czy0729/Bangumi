/*
 * @Author: czy0729
 * @Date: 2023-06-10 14:08:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-20 15:54:10
 */
import React from 'react'
import { Component, Text } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as RateProps } from './types'

export { RateProps }

/** 推荐值, 字体: Avenir */
export const Rate = ob(
  ({ style, textStyle, value = '', onPress }: RateProps) => (
    <Component id='base-rate' style={stl(styles.rate, style)}>
      <Text overrideStyle={stl(styles.rateText, textStyle)} onPress={onPress}>
        {value}
        {IOS ? '' : ' '}
      </Text>
    </Component>
  ),
  COMPONENT
)

export default Rate
