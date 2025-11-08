/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-05 00:18:53
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Flex, Loading } from '@components'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore, otaStore } from '@stores'
import { r } from '@utils/dev'
import { IMG_DEFAULT, IMG_HEIGHT_LG } from '@constants'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function ItemGrid({ pickIndex, index }: Props) {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const subjectId = otaStore.nsfwSubjectId(pickIndex)
    const { id, title, cover, score, rank, date } = otaStore.nsfw(subjectId)
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
        cover={cover ? `https://lain.bgm.tv/pic/cover/m/${cover}.jpg` : IMG_DEFAULT}
        cdn={false}
        name={title}
        score={score}
        rank={rank}
        airtime={date ? String(date).slice(0, 7) : ''}
        collection={collectionStore.collect(id)}
      />
    )
  })
}

export default ItemGrid
