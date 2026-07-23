/*
 * @Author: czy0729
 * @Date: 2022-11-20 08:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 02:52:17
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Cover as CoverComp } from '@components'
import { _, useStore } from '@stores'
import { x18 } from '@utils'
import { memoStyles as gridItemMemoStyles } from '../../item/styles'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../../types'
import type { Props } from './types'

function Cover({ subjectId, subject = {}, onPress }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const current = $.subject(subjectId)

  const itemStyles = gridItemMemoStyles()
  const imageWidth = _.isMobileLanscape ? 60 : itemStyles.item.width
  const imageHeight = imageWidth * 1.4

  return (
    <CoverComp
      key={subjectId}
      size={imageWidth}
      height={imageHeight}
      src={current?.images?.medium || subject?.images?.medium || ''}
      radius
      cdn={!x18(subjectId)}
      onPress={onPress}
    />
  )
}

export default observer(Cover)
