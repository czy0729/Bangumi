/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:21:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 05:47:04
 *
 * 找 Gal 网格布局条目
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

function ItemGrid({ pickIndex, index }: Props) {
  r(COMPONENT)

  const styles = memoStyles()

  const subjectId = otaStore.advSubjectId(pickIndex)
  const { id, title, cover, score, rank, date } = otaStore.adv(subjectId)
  const columnNum = getColumnNum()

  /**
   * 占位宽高随 _.window.contentWidth 实时变化 (iPad 分屏 / 分屏模式), 不能进 memoStyles:
   * memoStyles 失效键只含 mode / deepDark / orientation 等, 不含窗口宽度
   */
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

  const coverUrl = cover ? `${HOST_BGM_STATIC}/pic/cover/m/${cover}.jpg` : IMG_DEFAULT
  const collectionStatus = collectionStore.collect(id)

  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % columnNum) && styles.left}
      index={index}
      num={columnNum}
      id={id}
      cover={coverUrl}
      nameCn={title}
      score={score}
      rank={rank}
      airtime={date}
      collection={collectionStatus}
      offset={Math.floor(_.window.height * 0.4)}
      event={EVENT}
    />
  )
}

export default observer(ItemGrid)
