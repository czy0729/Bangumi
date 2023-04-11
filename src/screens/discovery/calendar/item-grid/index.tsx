/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-13 16:03:13
 */
import React from 'react'
import { systemStore, collectionStore } from '@stores'
import { obc } from '@utils/decorators'
import Item from './item'
import { Ctx } from '../types'
import { memoStyles } from './styles'

export default obc(
  ({ style, subjectId, name, images, score, air, time }, { $, navigation }: Ctx) => {
    // global.rerender('Calendar.Item')

    const { type } = $.state
    const collection = collectionStore.collect(subjectId)
    if (type === 'collect' && !collection) return null

    return (
      <Item
        navigation={navigation}
        styles={memoStyles()}
        hideScore={systemStore.setting.hideScore}
        style={style}
        subjectId={subjectId}
        name={name}
        images={images}
        score={score}
        collection={collection}
        air={air}
        time={time}
      />
    )
  }
)
