/*
 * @Author: czy0729
 * @Date: 2020-04-10 16:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-26 05:31:46
 */
import React from 'react'
import { systemStore, collectionStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import ItemLine from './item-line'
import { memoStyles } from './styles'

export default obc(
  (
    { subjectId, images = {}, name, desc, air, timeCN, score },
    { $, navigation }: Ctx
  ) => {
    global.rerender('Calendar.ItemLine')

    const { type, expand } = $.state
    const collection = collectionStore.collectionStatus(subjectId)
    if ((type === 'collect' && !collection) || (!expand && !timeCN)) return null

    return (
      <ItemLine
        navigation={navigation}
        styles={memoStyles()}
        hideScore={systemStore.setting.hideScore}
        subjectId={subjectId}
        name={name}
        desc={desc}
        images={images}
        air={air}
        timeCN={timeCN}
        expand={expand}
        collection={collection}
        score={score}
        onToggleExpand={$.onToggleExpand}
        onShowManageModal={$.onShowManageModal}
      />
    )
  }
)
