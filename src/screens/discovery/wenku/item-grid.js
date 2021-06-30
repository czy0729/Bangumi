/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:34:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-30 08:35:48
 */
import React from 'react'
import { ItemCollectionsGrid } from '@screens/_'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/wenku'

const event = {
  id: '文库.跳转'
}

function ItemGrid({ pickIndex }, { $, navigation }) {
  const { id, wenkuId, image, cn, jp, score, rank } = pick(pickIndex)
  if (!id) {
    return null
  }

  const cover = `//lain.bgm.tv/pic/cover/m/${image}.jpg`
  const collection = $.userCollectionsMap[id]
  return (
    <ItemCollectionsGrid
      navigation={navigation}
      event={event}
      id={id}
      wid={wenkuId}
      cover={cover}
      name={jp}
      nameCn={cn}
      score={score}
      rank={rank}
      isCollection={collection}
    />
  )
}

export default obc(ItemGrid)
