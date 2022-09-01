/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 14:09:17
 */
import React from 'react'
import { systemStore, collectionStore } from '@stores'
import { obc } from '@utils/decorators'
import Item from './item'
import { Ctx } from '../types'
import { memoStyles } from './styles'

export default obc(
  ({ style, subjectId, name, images, score, timeCN }, { $, navigation }: Ctx) => {
    global.rerender('Calendar.Item')

    const { type } = $.state
    const collection = collectionStore.collectionStatus(subjectId)
    if (type === 'collect' && !collection) return null

    const { air, timeCN: onAirTimeCN } = $.onAir[subjectId] || {}
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
        timeCN={onAirTimeCN || timeCN}
      />
    )
  }
)
