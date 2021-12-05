/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-05 12:52:29
 */
import React from 'react'
import { ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/hentai'

const event = {
  id: 'Hentai.跳转'
}

function ItemGrid({ pickIndex, index, num }, { $, navigation }) {
  const { id, hId, image, cn, jp, score, rank } = pick(pickIndex)
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
      hid={hId}
      cover={cover}
      name={jp}
      nameCn={cn}
      score={score}
      rank={rank}
      textOnly={!$.isLogin}
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
