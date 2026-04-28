/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:21:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 05:47:04
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Loading } from '@components'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore, otaStore } from '@stores'
import { r } from '@utils/dev'
import { HOST_BGM_STATIC, IMG_DEFAULT, IMG_HEIGHT_LG } from '@constants'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function ItemGrid({ pickIndex, index }: Props) {
  r(COMPONENT)

  const styles = memoStyles()

  // --- Data Logic ---
  const subjectId = otaStore.advSubjectId(pickIndex)
  const { id } = otaStore.adv(subjectId)
  const columnNum = _.portrait(3, 5)

  // --- Render ---
  if (!id) {
    const gridStyles = _.grid(columnNum)
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

  const { title, cover, score, rank, date } = otaStore.adv(subjectId)
  const coverUrl = cover ? `${HOST_BGM_STATIC}/pic/cover/m/${cover}.jpg` : IMG_DEFAULT
  const collectionStatus = collectionStore.collect(id)

  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % columnNum) && styles.left}
      num={columnNum}
      id={id}
      cover={coverUrl}
      nameCn={title}
      score={score}
      rank={rank}
      airtime={date}
      collection={collectionStatus}
      event={EVENT}
    />
  )
}

export default observer(ItemGrid)
