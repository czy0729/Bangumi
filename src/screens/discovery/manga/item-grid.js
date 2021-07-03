/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:01:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-03 14:27:48
 */
import React from 'react'
import { ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/manga'
import { IMG_DEFAULT } from '@constants'

const event = {
  id: 'Manga.跳转'
}

function ItemGrid({ pickIndex, index }, { $, navigation }) {
  const { id, mangaId, image, cn, jp, score, rank } = pick(pickIndex)
  if (!id) return null

  const cover = image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const collection = $.userCollectionsMap[id]
  return (
    <ItemCollectionsGrid
      style={!(index % 3) && styles.left}
      navigation={navigation}
      event={event}
      id={id}
      mid={mangaId}
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

const styles = _.create({
  left: {
    marginLeft: _.wind
  }
})
