/*
 * @Author: czy0729
 * @Date: 2022-11-20 08:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 21:19:44
 */
import React from 'react'
import { Cover as CoverComp } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../../types'
import { memoStyles as gridItemMemoStyles } from '../../item/styles'
import { COMPONENT } from './ds'
import { Props } from './types'

function Cover({ subjectId, subject = {}, onPress }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
        onPress={onPress}
      />
    )
  })
}

export default Cover
