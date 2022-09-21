/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:21:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-22 03:54:08
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/adv'
import { IMG_DEFAULT } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: 'ADV.跳转'
} as const

function fixed(image: string | string[]) {
  if (image.includes('m/')) return image
  return `m/${image}`
}

function ItemGrid({ pickIndex, index, num }, { $, navigation }: Ctx) {
  const { id, title, cover: image, score, rank, time } = pick(pickIndex)
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
      nameCn={title}
      score={score}
      rank={rank}
      airtime={time}
      collection={collection}
    />
  )
}

export default obc(ItemGrid)
