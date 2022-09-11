/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 12:33:47
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/hentai'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: 'Hentai.跳转'
} as const

function ItemGrid({ pickIndex, index, num }, { $, navigation }: Ctx) {
  const {
    id,
    // hId,
    image,
    cn,
    jp,
    score,
    rank,
    air
  } = pick(pickIndex)
  if (!id) return null

  const styles = memoStyles()
  const cover = `//lain.bgm.tv/pic/cover/m/${image}.jpg`
  const collection = $.userCollectionsMap[id]
  return (
    <ItemCollectionsGrid
      navigation={navigation}
      style={(_.isPad || _.isLandscape) && !(index % num) && styles.left}
      event={EVENT}
      num={num}
      id={id}
      // hid={hId}
      cover={cover}
      name={jp}
      nameCn={cn}
      score={score}
      rank={rank}
      airtime={air ? String(air).slice(0, 7) : ''}
      collection={collection}
    />
  )
}

export default obc(ItemGrid)
