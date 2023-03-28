/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:21:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 07:40:24
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
  id: 'ADV.跳转'
} as const

function ItemGrid({ pickIndex, index, num }, { navigation }: Ctx) {
  const subjectId = otaStore.advSubjectId(pickIndex)
  const {
    id,
    t: title,
    c: image,
    sc: score,
    r: rank,
    en: time
  } = otaStore.game(subjectId)
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

  const styles = memoStyles()
  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % num) && styles.left}
      navigation={navigation}
      event={EVENT}
      num={num}
      id={id}
      cover={image ? `https://lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT}
      nameCn={title}
      score={score}
      rank={rank}
      airtime={time}
      collection={collectionStore.collect(id)}
    />
  )
}

export default obc(ItemGrid)
