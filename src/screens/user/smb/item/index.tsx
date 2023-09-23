/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:31:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-23 06:55:15
 */
import React from 'react'
import { collectionStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Item from './item'
import { memoStyles } from './styles'

export default obc(({ subjectId, ...folder }, { $, navigation }: Ctx) => {
  const { id, jp, cn, image, type, eps = 0, rank, rating } = $.subjectV2(subjectId)
  const { status = { name: '' } } = $.collection(subjectId)
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
      eps={eps}
      air_date={$.airDate(subjectId)}
      rank={rank}
      rating={rating}
      collection={collectionStore.collect(subjectId) || status.name}
      folder={folder}
      smb={$.current.smb}
      url={$.url}
    />
  )
})
