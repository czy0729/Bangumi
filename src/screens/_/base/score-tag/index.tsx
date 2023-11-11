/*
 * @Author: czy0729
 * @Date: 2019-03-23 08:43:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-10 00:11:47
 */
import React from 'react'
import { Component, Flex, Text } from '@components'
import { _ } from '@stores'
import { stl, getRating } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'
import { Props as ScoreTagProps } from './types'

export { ScoreTagProps }

/** 评分中文标签 */
export const ScoreTag = ob(({ style, value = 0 }: ScoreTagProps) => {
  const styles = memoStyles()
  return (
    <Component id='base-score-tag'>
      <Flex style={stl(styles.container, style)}>
        <Text type={_.select('plain', 'main')} size={12}>
          {getRating(value)}
        </Text>
      </Flex>
    </Component>
  )
})
