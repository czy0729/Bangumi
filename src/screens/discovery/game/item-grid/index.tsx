/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:21:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 16:23:07
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/game'
import { IMG_DEFAULT } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: '游戏.跳转'
} as const

function fixed(image: string | string[]) {
  if (image.includes('m/')) return image
  return `m/${image}`
}

function ItemGrid({ pickIndex, index, num }, { $, navigation }: Ctx) {
  const { id, title, sub, cover: image, score, rank, time } = pick(pickIndex)
  if (!id) return null

  const styles = memoStyles()
  const collection = $.userCollectionsMap[id]
  const cover = image ? `//lain.bgm.tv/pic/cover/${fixed(image)}.jpg` : IMG_DEFAULT
  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % num) && styles.left}
      navigation={navigation}
      event={EVENT}
      num={num}
      id={id}
      cover={cover}
      name={sub}
      nameCn={title}
      score={score}
      rank={rank}
      airtime={time}
      collection={collection}
    />
  )
}

export default obc(ItemGrid)
