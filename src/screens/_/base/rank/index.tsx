/*
 * @Author: czy0729
 * @Date: 2021-03-06 04:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 19:40:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Text } from '@components'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import { fontSize } from '@styles'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as RankProps } from './types'
export type { RankProps }

/** 排名标签 */
export const Rank = observer(({ style, size = 10, value }: RankProps) => {
  r(COMPONENT)

  if (systemStore.setting.hideScore || !value) return null

  const styles = memoStyles()
  const lineHeight = size + 1

  return (
    <Component id='base-rank'>
      <Text
        style={stl(
          styles.rank,
          style,
          WEB && size < 12 && fontSize(size, lineHeight, true),
          WEB && styles.fit
        )}
        size={size}
        lineHeight={lineHeight}
        bold
        align='center'
        noWrap
      >
        {value}
      </Text>
    </Component>
  )
})

export default Rank
