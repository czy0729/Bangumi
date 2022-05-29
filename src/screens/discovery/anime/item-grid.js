/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-29 09:15:20
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/anime'

const event = {
  id: 'Anime.跳转'
}

function ItemGrid({ index, pickIndex, num }, { $, navigation }) {
  const { id, ageId, image, cn, jp, score, begin, rank } = pick(pickIndex)
  if (!id) return null

  const styles = memoStyles()
  const cover = `//lain.bgm.tv/pic/cover/m/${image}.jpg`
  const collection = $.userCollectionsMap[id]
  return (
    <ItemCollectionsGrid
      navigation={navigation}
      style={(_.isPad || _.isLandscape) && !(index % num) && styles.left}
      event={event}
      num={num}
      id={id}
      aid={ageId}
      cover={cover}
      name={jp}
      nameCn={cn}
      score={score}
      rank={rank}
      airtime={begin ? String(begin).slice(0, 7) : ''}
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
