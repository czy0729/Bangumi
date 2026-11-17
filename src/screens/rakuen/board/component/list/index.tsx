/*
 * @Author: czy0729
 * @Date: 2021-04-07 10:23:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 10:00:00
 *
 * 帖子列表: 空状态与进场动画列表
 */
import { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { EmptyCompact } from '@_'
import { _, useStore } from '@stores'
import { LIST_EMPTY } from '@constants'
import Item from '../item'
import { COMPONENT, ENTERING_ANIMATIONS_NUM } from './ds'

import type { Board, BoardItem } from '@stores/rakuen/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  /** 首帧渲染空数据, 让列表容器与 cell 分两批挂载 (同批挂载的 cell 会被 skipEntering 跳过进场动画) */
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

  const handleRenderItem = useCallback(({ item }: RenderItem<BoardItem>) => <Item {...item} />, [])

  /** BoardItem 没有 id, 通用 keyExtractor 会全部返回空串, 导致 cell 复用且进场动画失效 */
  const handleKeyExtractor = useCallback((item: BoardItem) => item.href, [])

  const { list, _loaded } = $.board
  if (ready && _loaded && !list.length) return <EmptyCompact />

  return (
    <ListView
      contentContainerStyle={_.container.bottom}
      keyExtractor={handleKeyExtractor}
      skipEnteringExitingAnimations={ENTERING_ANIMATIONS_NUM}
      data={ready ? $.board : (LIST_EMPTY as Board)}
      renderItem={handleRenderItem}
      showFooter={false}
      onHeaderRefresh={$.fetchBoard}
    />
  )
}

export default observer(List)
