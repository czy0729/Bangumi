/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:01:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 21:09:19
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/manga'
import { IMG_DEFAULT } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: 'Manga.跳转'
} as const

function ItemGrid({ pickIndex, index, num }, { $, navigation }: Ctx) {
  const { id, mangaId, image, cn, jp, score, rank, begin } = pick(pickIndex)
  if (!id) return null

  const styles = memoStyles()
  const cover = image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const collection = $.userCollectionsMap[id]
  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % num) && styles.left}
      navigation={navigation}
      event={EVENT}
      num={num}
      id={id}
      mid={mangaId}
      cover={cover}
      name={jp}
      nameCn={cn}
      score={score}
      rank={rank}
      airtime={begin}
      collection={collection}
    />
  )
}

export default obc(ItemGrid)
