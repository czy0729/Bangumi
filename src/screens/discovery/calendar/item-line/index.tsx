/*
 * @Author: czy0729
 * @Date: 2020-04-10 16:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 03:49:50
 */
import React from 'react'
import { collectionStore, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import ItemLine from './item-line'
import { memoStyles } from './styles'

export default obc(
  (
    { subjectId, images = {}, name, desc, air, time, rank, score, total, section, index },
    { $, navigation }: Ctx
  ) => {
    rerender('Calendar.ItemLine')

    const { type, expand } = $.state
    const collection = collectionStore.collect(subjectId)
    if ((type === 'collect' && !collection) || (!expand && !time)) return null

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
        images={images}
        air={air}
        time={time}
        expand={expand}
        collection={collection}
        rank={rank}
        score={score}
        total={total}
        sites={sites}
        onToggleExpand={$.onToggleExpand}
      />
    )
  }
)
