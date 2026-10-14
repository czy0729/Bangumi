/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 找番剧网格布局条目
 */
import { observer } from 'mobx-react'
import { Flex, Loading } from '@components'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore, otaStore } from '@stores'
import { r } from '@utils/dev'
import { HOST_BGM_STATIC, IMG_DEFAULT, IMG_HEIGHT_LG } from '@constants'
import { getColumnNum } from '../ds'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function ItemGrid({ index, pickIndex }: Props) {
  r(COMPONENT)

  const styles = memoStyles()

  const subjectId = otaStore.animeSubjectId(pickIndex)
  const anime = otaStore.anime(subjectId)
  const num = getColumnNum()

  if (!anime?.id) {
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

  const { id, ageId, image, cn, jp, score, begin, rank } = anime

  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % num) && styles.left}
      index={index}
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
      offset={Math.floor(_.window.height * 0.4)}
      event={EVENT}
    />
  )
}

export default observer(ItemGrid)
