/*
 * 评分中文标签
 * @Author: czy0729
 * @Date: 2019-03-23 08:43:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-13 17:34:48
 */
import React from 'react'
import { Component, Flex, Text } from '@components'
import { _ } from '@stores'
import { stl, getRating } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'
import { Props as ScoreTagProps } from './types'

export { ScoreTagProps }

export const ScoreTag = ob(({ style, value = 0 }: ScoreTagProps) => {
  const styles = memoStyles()
  return (
    <Component id='score-tag'>
      <Flex style={stl(styles.container, style)}>
        <Text type={_.select('plain', 'main')} size={12}>
          {getRating(value)}
        </Text>
      </Flex>
    </Component>
  )
})
