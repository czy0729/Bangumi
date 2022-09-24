/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 18:00:00
 */
import React from 'react'
import { Flex, Loading } from '@components'
import { ItemCollectionsGrid } from '@_'
import { _, otaStore, collectionStore } from '@stores'
import { obc } from '@utils/decorators'
import { IMG_DEFAULT, IMG_HEIGHT_LG } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: 'Anime.跳转'
} as const

function ItemGrid({ index, pickIndex, num }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const subjectId = otaStore.animeSubjectId(pickIndex)
  const { id, ageId, image, cn, jp, score, begin, rank } = otaStore.anime(subjectId)
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
      navigation={navigation}
      style={(_.isPad || _.isLandscape) && !(index % num) && styles.left}
      event={EVENT}
      num={num}
      id={id}
      aid={ageId}
      cover={image ? `https://lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT}
      name={jp}
      nameCn={cn}
      score={score}
      rank={rank}
      airtime={begin ? String(begin).slice(0, 7) : ''}
      collection={
        collectionStore.collectionStatus(id) || $.userCollectionsMap[id] || ''
      }
    />
  )
}

export default obc(ItemGrid)
