/*
 * @Author: czy0729
 * @Date: 2020-04-10 16:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 10:48:27
 */
import React from 'react'
import { collectionStore, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import ItemLine from './item-line'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ItemLineWrap({
  subjectId,
  images,
  name,
  desc,
  time,
  prevTime,
  rank,
  score,
  total,
  index
}) {
  const { $ } = useStore<Ctx>()
  return (
    <ItemLine
      index={index}
      styles={memoStyles()}
      hideScore={systemStore.setting.hideScore}
      subjectId={subjectId}
      name={name}
      desc={desc}
      image={images?.medium}
      time={time}
      prevTime={prevTime}
      expand={$.state.expand || !!($.state.origin || $.state.tag)}
      collection={collectionStore.collect(subjectId)}
      rank={rank}
      score={score}
      total={total}
      sites={$.sites(subjectId)}
    />
  )
}

export default ob(ItemLineWrap, COMPONENT)
