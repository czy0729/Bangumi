/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 05:43:43
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

function ItemGrid({ index, pickIndex }: Props) {
  r(COMPONENT)

  const styles = memoStyles()

  const subjectId = otaStore.animeSubjectId(pickIndex)
  const { id, ageId, image, cn, jp, score, begin, rank } = otaStore.anime(subjectId)
  const num = _.portrait(3, 5)

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
      cover={image ? `${HOST_BGM_STATIC}/pic/cover/m/${image}.jpg` : IMG_DEFAULT}
      name={jp}
      nameCn={cn}
      score={score}
      rank={rank}
      airtime={begin ? String(begin).slice(0, 7) : ''}
      collection={collectionStore.collect(id)}
    />
  )
}

export default observer(ItemGrid)
