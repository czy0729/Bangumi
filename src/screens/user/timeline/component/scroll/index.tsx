/*
 * @Author: czy0729
 * @Date: 2026-02-02 07:09:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 时间线滚动容器: 瓷砖进度 + 分组列表
 */
import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { MosaicTile } from '@_'
import { _, useStore } from '@stores'
import { useMosaicTileType } from '../../hooks'
import List from '../list'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

/** 时间线滚动容器 */
function Scroll() {
  const { $ } = useStore<Ctx>(COMPONENT)

  /** store 中的瓷砖是时间胶囊类型的数据 */
  const { mosaicTile: timelineTiles } = $
  const { type, mosaicTile, loading, handleTypeChange } = useMosaicTileType(
    String($.userId),
    timelineTiles
  )

  const elListHeaderComponent = useMemo(
    () => (
      <>
        <MosaicTile
          mosaicTile={mosaicTile}
          type={type}
          loading={loading}
          onTypeChange={handleTypeChange}
        />
        <List />
      </>
    ),
    [handleTypeChange, loading, mosaicTile, type]
  )

  const handleRenderItem = useCallback(() => <View />, [])

  return (
    <ListView
      contentContainerStyle={_.container.bottom}
      data={$.timeline}
      ListHeaderComponent={elListHeaderComponent}
      renderItem={handleRenderItem}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchTimeline}
    />
  )
}

export default observer(Scroll)
