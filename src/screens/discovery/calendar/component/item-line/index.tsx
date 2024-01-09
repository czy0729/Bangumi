/*
 * @Author: czy0729
 * @Date: 2020-04-10 16:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 15:31:36
 */
import React from 'react'
import { collectionStore, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import ItemLine from './item-line'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ItemLineWrap(
  { subjectId, images, name, desc, air, time, prevTime, rank, score, total, section, index },
  { $, navigation }: Ctx
) {
  if (!$.state.expand && !time) return null

  let collection: string
  if ($.state.type === 'collect') {
    collection = collectionStore.collect(subjectId)
    if (!collection) return null
  }

  const sites = $.sites(subjectId)
  return (
    <ItemLine
      navigation={navigation}
      section={section}
      index={index}
      styles={memoStyles()}
      hideScore={systemStore.setting.hideScore}
      subjectId={subjectId}
      name={name}
      desc={desc}
      image={images?.medium}
      air={air}
      time={time}
      prevTime={prevTime}
      expand={$.state.expand}
      collection={collection}
      rank={rank}
      score={score}
      total={total}
      sites={sites}
      onToggleExpand={$.onToggleExpand}
    />
  )
}

export default obc(ItemLineWrap, COMPONENT)
