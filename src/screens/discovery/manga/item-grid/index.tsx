/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:01:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 21:09:19
 */
import React from 'react'
import { Flex, Loading } from '@components'
import { ItemCollectionsGrid } from '@_'
import { collectionStore, _ } from '@stores'
import { obc } from '@utils/decorators'
import { IMG_DEFAULT, IMG_HEIGHT_LG } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: 'Manga.跳转'
} as const

function ItemGrid({ pickIndex, index, num }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { id, mid, image, title, score, rank, publish } = $.pick(pickIndex)
  if (!id) {
    const gridStyles = _.grid(num)
    return (
      <Flex
        style={{
          width: gridStyles.width,
          height: IMG_HEIGHT_LG,
          marginBottom: gridStyles.marginLeft + _.xs,
          marginLeft: gridStyles.marginLeft
        }}
        justify='center'
      >
        <Loading.Raw />
      </Flex>
    )
  }

  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % num) && styles.left}
      navigation={navigation}
      event={EVENT}
      num={num}
      id={id}
      mid={mid}
      cover={image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT}
      name={title}
      score={score}
      rank={rank}
      airtime={publish}
      collection={
        collectionStore.collectionStatus(id) || $.userCollectionsMap[id] || ''
      }
    />
  )
}

export default obc(ItemGrid)
