/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 16:01:59
 */
import React from 'react'
import { Flex, Loading } from '@components'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore, otaStore } from '@stores'
import { ob } from '@utils/decorators'
import { IMG_DEFAULT, IMG_HEIGHT_LG } from '@constants'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

function ItemGrid({ index, pickIndex, num }) {
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
      collection={collectionStore.collect(id)}
    />
  )
}

export default ob(ItemGrid, COMPONENT)
