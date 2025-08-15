/*
 * @Author: czy0729
 * @Date: 2023-03-28 06:19:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-01 09:22:32
 */
import React from 'react'
import { Flip as FlipComp } from '@components'
import { uiStore } from '@stores'
import { ob } from '@utils/decorators'

function Flip({ height, topicId, id, children, ...other }) {
  if (
    !uiStore.flip.animate ||
    uiStore.flip.topicId != topicId ||
    uiStore.flip.floorId !== id
  ) {
    return children
  }

  const { key } = uiStore.flip
  return (
    <FlipComp
      key={key}
      height={height}
      topicId={topicId}
      id={id}
      {...other}
      onAnimated={uiStore.afterFlip}
    >
      {children}
    </FlipComp>
  )
}

export default ob(Flip)
