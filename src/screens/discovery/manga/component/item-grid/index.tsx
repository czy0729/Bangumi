/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:01:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 16:03:28
 */
import React from 'react'
import { Flex, Loading } from '@components'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore, otaStore } from '@stores'
import { ob } from '@utils/decorators'
import { IMG_DEFAULT, IMG_HEIGHT_LG } from '@constants'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

function ItemGrid({ pickIndex, index, num }) {
  const styles = memoStyles()
  const subjectId = otaStore.mangaSubjectId(pickIndex)
  const manga = otaStore.manga(subjectId)
  if (!manga?.id) {
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

  const { id, mid, image, title, score, rank, publish } = otaStore.manga(subjectId)
  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % num) && styles.left}
      num={num}
      id={id}
      mid={mid}
      cover={image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT}
      name={title}
      score={score}
      rank={rank}
      airtime={publish}
      typeCn='书籍'
      collection={collectionStore.collect(id)}
      event={EVENT}
    />
  )
}

export default ob(ItemGrid, COMPONENT)
