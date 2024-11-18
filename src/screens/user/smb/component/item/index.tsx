/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:31:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:23:54
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx, MergeListItem } from '../../types'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export default ob(({ subjectId, merge, ...folder }: MergeListItem) => {
  const { $, navigation } = useStore<Ctx>()
  if (!folder?.list?.length) return null

  const { id, jp, cn, image, type } = $.subjectV2(subjectId)
  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      loaded={!!id}
      subjectId={subjectId}
      jp={jp}
      cn={cn}
      image={image}
      type={type}
      folder={folder}
      merge={merge}
    />
  )
}, COMPONENT)
