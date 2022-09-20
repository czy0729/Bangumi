/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:34:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-12 16:41:06
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/wenku'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: '文库.跳转'
} as const

function ItemGrid({ pickIndex, index, num }, { $, navigation }: Ctx) {
  const { id, wenkuId, image, cn, score, rank, begin, update } = pick(pickIndex)
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
      wid={wenkuId}
      cover={cover}
      nameCn={cn}
      score={score}
      rank={rank}
      airtime={begin || update}
      collection={collection}
    />
  )
}

export default obc(ItemGrid)
