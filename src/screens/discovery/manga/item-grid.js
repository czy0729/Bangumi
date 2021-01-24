/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:01:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-25 01:40:53
 */
import React from 'react'
import { ItemCollectionsGrid } from '@screens/_'
import { obc } from '@utils/decorators'
import { pick } from '@utils/manga'
import { IMG_DEFAULT } from '@constants'

const event = {
  id: 'Manga.跳转'
}

function ItemGrid({ pickIndex }, { $, navigation }) {
  const { id, mangaId, image, cn, jp, score } = pick(pickIndex)
  if (!id) {
    return null
  }

  const cover = image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const collection = $.userCollectionsMap[id]
  return (
    <ItemCollectionsGrid
      navigation={navigation}
      event={event}
      id={id}
      mid={mangaId}
      cover={cover}
      name={jp}
      nameCn={cn}
      score={score}
      isCollection={collection}
    />
  )
}

export default obc(ItemGrid)
