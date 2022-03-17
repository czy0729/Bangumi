/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:21:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-05 12:56:29
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/game'
import { IMG_DEFAULT } from '@constants'

const event = {
  id: '游戏.跳转'
}

function fixed(image) {
  if (image.includes('m/')) return image
  return `m/${image}`
}

function ItemGrid({ pickIndex, index, num }, { $, navigation }) {
  const { id, title, sub, cover: image, score, rank } = pick(pickIndex)
  if (!id) return null

  const styles = memoStyles()
  const collection = $.userCollectionsMap[id]
  const cover = image ? `//lain.bgm.tv/pic/cover/${fixed(image)}.jpg` : IMG_DEFAULT
  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % num) && styles.left}
      navigation={navigation}
      event={event}
      num={num}
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

const memoStyles = _.memoStyles(() => ({
  left: {
    marginLeft: _.wind
  }
}))
