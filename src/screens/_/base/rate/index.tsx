/*
 * @Author: czy0729
 * @Date: 2023-06-10 14:08:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:21:13
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Text } from '@components'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as RateProps } from './types'
export type { RateProps }

/** 推荐值 (字体: Avenir) */
export const Rate = observer(({ style, textStyle, value = '', onPress }: RateProps) => {
  r(COMPONENT)

  return (
    <Component id='base-rate' style={stl(styles.rate, style)}>
      <Text overrideStyle={stl(styles.rateText, textStyle)} onPress={onPress}>
        {`${value} `}
      </Text>
    </Component>
  )
})

export default Rate
