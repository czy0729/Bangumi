/*
 * @Author: czy0729
 * @Date: 2022-11-20 08:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:40:18
 */
import React from 'react'
import { Cover as CoverComp } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../../types'
import { memoStyles as gridItemMemoStyles } from '../../item/styles'
import { COMPONENT } from './ds'

function Cover({ subjectId, subject = {} as any, onPress }) {
  const { $ } = useStore<Ctx>()
  const _subject = $.subject(subjectId)
  const itemStyles = gridItemMemoStyles()
  const imageWidth = _.isMobileLanscape ? 60 : itemStyles.item.width
  const imageHeight = imageWidth * 1.4
  return (
    <CoverComp
      key={subjectId}
      size={imageWidth}
      height={imageHeight}
      src={_subject?.images?.medium || subject?.images?.medium || ''}
      radius
      onPress={onPress}
    />
  )
}

export default ob(Cover, COMPONENT)
