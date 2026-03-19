/*
 * @Author: czy0729
 * @Date: 2019-03-23 08:43:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:23:04
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Flex, Text } from '@components'
import { _ } from '@stores'
import { getRating, stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as ScoreTagProps } from './types'
export type { ScoreTagProps }

/** 评分中文标签 */
export const ScoreTag = observer(({ style, value = 0 }: ScoreTagProps) => {
  r(COMPONENT)

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

export default ScoreTag
