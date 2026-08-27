/*
 * @Author: czy0729
 * @Date: 2023-03-28 06:19:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 11:20:17
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flip as FlipComp } from '@components'
import { uiStore } from '@stores'

import type { Props } from './types'

function Flip({ height, topicId, id, children, ...other }: Props) {
  if (!uiStore.flip.animate || uiStore.flip.topicId != topicId || uiStore.flip.floorId !== id) {
    return children
  }
  const { key } = uiStore.flip

  // 注意: topicId / id 等字段不透传给 FlipComp(其类型不含这些字段),
  // 子元素需自行持有渲染所需的全部 props, cloneElement 只会注入 other 中剩余的字段
  return (
    <FlipComp key={key} height={height} {...other} onAnimated={uiStore.afterFlip}>
      {children}
    </FlipComp>
  )
}

export default observer(Flip)
