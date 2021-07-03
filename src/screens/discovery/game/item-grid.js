/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:21:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-03 14:37:48
 */
import React from 'react'
import { ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/game'

const event = {
  id: '游戏.跳转'
}

function ItemGrid({ pickIndex, index }, { $, navigation }) {
  const { id, title, sub, cover, score, rank } = pick(pickIndex)
  if (!id) return null

  const collection = $.userCollectionsMap[id]
  return (
    <ItemCollectionsGrid
      style={!(index % 3) && styles.left}
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

const styles = _.create({
  left: {
    marginLeft: _.wind
  }
})
