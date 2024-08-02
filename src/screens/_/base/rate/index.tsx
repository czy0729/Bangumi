/*
 * @Author: czy0729
 * @Date: 2023-06-10 14:08:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 02:33:19
 */
import React from 'react'
import { Component, Text } from '@components'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as RateProps } from './types'

export { RateProps }

/** 推荐值, 字体: Avenir */
export const Rate = ob(
  ({ value = '', onPress }: RateProps) => (
    <Component id='base-rate' style={styles.rate}>
      <Text overrideStyle={styles.rateText} onPress={onPress}>
        {value}
        {IOS ? '' : ' '}
      </Text>
    </Component>
  ),
  COMPONENT
)

export default Rate
