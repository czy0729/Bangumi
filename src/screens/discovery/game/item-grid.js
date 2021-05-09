/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:21:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-10 01:08:43
 */
import React from 'react'
import { ItemCollectionsGrid } from '@screens/_'
import { obc } from '@utils/decorators'
import { pick } from '@utils/game'

const event = {
  id: '游戏.跳转'
}

function ItemGrid({ pickIndex }, { $, navigation }) {
  const { id, title, sub, cover, score, rank } = pick(pickIndex)
  if (!id) {
    return null
  }

  const collection = $.userCollectionsMap[id]
  return (
    <ItemCollectionsGrid
      navigation={navigation}
      event={event}
      id={id}
      cover={cover}
      name={sub}
      nameCn={title}
      score={score}
      rank={rank}
      isCollection={collection}
    />
  )
}

export default obc(ItemGrid)
