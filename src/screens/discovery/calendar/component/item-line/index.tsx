/*
 * @Author: czy0729
 * @Date: 2020-04-10 16:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-29 12:40:20
 */
import React from 'react'
import { collectionStore, systemStore } from '@stores'
import { getOnAirItem } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import ItemLine from './item-line'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ItemLineWrap(
  { subjectId, images, name, desc, time, prevTime, rank, score, total, section, index },
  { $ }: Ctx
) {
  const { expand } = $.state
  if (!expand && !time) return null

  const collection = collectionStore.collect(subjectId)
  if ($.state.type === 'collect' && !collection) return null

  const { adapt, origin, tag } = $.state
  const {
    type: onAirAdapt = '',
    origin: onAirOrigin = '',
    tag: onAirTag = ''
  } = getOnAirItem(subjectId)
  if (
    (adapt && onAirAdapt !== adapt) ||
    (origin && !onAirOrigin?.includes(origin)) ||
    (tag && !onAirTag?.includes(tag))
  ) {
    return null
  }

  return (
    <ItemLine
      section={section}
      index={index}
      styles={memoStyles()}
      hideScore={systemStore.setting.hideScore}
      subjectId={subjectId}
      name={name}
      desc={desc}
      image={images?.medium}
      // air={air}
      time={time}
      prevTime={prevTime}
      expand={expand || !!(origin || tag)}
      collection={collection}
      rank={rank}
      score={score}
      total={total}
      sites={$.sites(subjectId)}
      onToggleExpand={$.onToggleExpand}
    />
  )
}

export default obc(ItemLineWrap, COMPONENT)
