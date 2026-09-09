/*
 * @Author: czy0729
 * @Date: 2026-02-02 07:09:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:58:49
 */
import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { MosaicTile } from '@_'
import { _, useStore } from '@stores'
import List from '../list'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Scroll() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { mosaicTile } = $

  const elListHeaderComponent = useMemo(
    () => (
      <>
        <MosaicTile mosaicTile={mosaicTile} />
        <List />
      </>
    ),
    [mosaicTile]
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
