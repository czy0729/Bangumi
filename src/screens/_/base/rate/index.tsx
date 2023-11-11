/*
 * @Author: czy0729
 * @Date: 2023-06-10 14:08:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-10 00:05:55
 */
import React from 'react'
import { Component, Text } from '@components'
import { ob } from '@utils/decorators'
import { styles } from './styles'
import { Props as RateProps } from './types'
import { IOS } from '@constants'

export { RateProps }

/** 推荐值, 字体: Avenir */
export const Rate = ob(({ value = '', onPress }: RateProps) => {
  return (
    <Component id='base-rate' style={styles.rate}>
      <Text overrideStyle={styles.rateText} onPress={onPress}>
        {value}
        {IOS ? '' : ' '}
      </Text>
    </Component>
  )
})
