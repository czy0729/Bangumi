/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 *
 * 找画集网格布局条目
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

import type { Props } from '../types'

function ItemGrid({ pickIndex, index }: Props) {
  r(COMPONENT)

  const styles = memoStyles()

  const subjectId = otaStore.albumSubjectId(pickIndex)
  const { id, title, cover, score, rank, date } = otaStore.album(subjectId)
  const num = getColumnNum()

  if (!id) {
    /**
     * 占位宽高随 _.window.contentWidth 实时变化 (iPad 分屏 / 分屏模式), 不能进 memoStyles:
     * memoStyles 失效键只含 mode / deepDark / orientation 等, 不含窗口宽度
     *  - 高度取 IMG_HEIGHT_LG: 画集封面为竖版, 与真实封面等高, 否则数据到位时整行跳动
     */
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
      index={index}
      num={num}
      id={id}
      cover={cover ? `${HOST_BGM_STATIC}/pic/cover/m/${cover}.jpg` : IMG_DEFAULT}
      cdn={false}
      nameCn={title}
      score={score}
      rank={rank}
      airtime={date ? String(date).slice(0, 7) : ''}
      collection={collectionStore.collect(id)}
      offset={Math.floor(_.window.height * 0.4)}
      event={EVENT}
    />
  )
}

export default observer(ItemGrid)
