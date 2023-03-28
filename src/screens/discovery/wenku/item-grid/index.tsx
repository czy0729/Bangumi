/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:34:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 07:39:18
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
  id: '文库.跳转'
} as const

function ItemGrid({ pickIndex, index, num }, { navigation }: Ctx) {
  const styles = memoStyles()
  const subjectId = otaStore.wenkuSubjectId(pickIndex)
  const { id, wid, image, cn, score, rank, begin, update } = otaStore.wenku(subjectId)
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
      wid={wid}
      cover={image ? `https://lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT}
      nameCn={cn}
      score={score}
      rank={rank}
      airtime={begin || update ? String(begin || update).slice(0, 7) : ''}
      typeCn='书籍'
      collection={collectionStore.collect(id)}
    />
  )
}

export default obc(ItemGrid)
