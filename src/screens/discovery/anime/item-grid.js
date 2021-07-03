/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-04 07:36:11
 */
import React from 'react'
import { ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/anime'

const event = {
  id: 'Anime.跳转'
}

function ItemGrid({ pickIndex, index, num }, { $, navigation }) {
  const { id, ageId, image, cn, jp, score, rank } = pick(pickIndex)
  if (!id) return null

  const cover = `//lain.bgm.tv/pic/cover/m/${image}.jpg`
  const collection = $.userCollectionsMap[id]
  return (
    <ItemCollectionsGrid
      style={_.isPad && !(index % num) && styles.left}
      navigation={navigation}
      event={event}
      id={id}
      aid={ageId}
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
