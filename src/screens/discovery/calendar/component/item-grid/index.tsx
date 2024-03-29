/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 04:20:46
 */
import React from 'react'
import { collectionStore, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ItemGridWrap({ subjectId, name, images, score, time }, { $, navigation }: Ctx) {
  const collection = collectionStore.collect(subjectId)
  if ($.state.type === 'collect' && !collection) return null

  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      hideScore={systemStore.setting.hideScore}
      subjectId={subjectId}
      name={name}
      image={images?.medium}
      score={score}
      collection={collection}
      time={time}
    />
  )
}

export default obc(ItemGridWrap, COMPONENT)
