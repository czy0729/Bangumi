/*
 * @Author: czy0729
 * @Date: 2023-03-28 06:19:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:34:41
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flip as FlipComp } from '@components'
import { uiStore } from '@stores'

function Flip({ subjectId, height, children, ...other }) {
  if (!uiStore.flip.animate || uiStore.flip.subjectId != subjectId) return children

  const { key } = uiStore.flip

  return (
    <FlipComp key={key} height={height} {...other} onAnimated={uiStore.afterFlip}>
      {children}
    </FlipComp>
  )
}

export default observer(Flip)
