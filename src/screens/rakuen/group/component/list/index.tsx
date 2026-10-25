/*
 * @Author: czy0729
 * @Date: 2019-07-12 22:44:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 00:00:00
 *
 * 帖子列表
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { useStore } from '@stores'
import { LIST_EMPTY, WEB } from '@constants'
import Empty from '../empty'
import Info from '../info'
import Item from '../item'
import { useScrollToHeader } from './hooks'
import { COMPONENT, ENTERING_ANIMATIONS_NUM } from './ds'
import { styles } from './styles'

import type { Group, GroupItem } from '@stores/rakuen/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { list, _loaded } = $.group
  const { title: group } = $.groupInfo
  const { page, showLastDate } = $.state

  const { handleRef, handleHeaderLayout, handleScroll, handleContentSizeChange } =
    useScrollToHeader({
      page,
      loaded: !!_loaded,
      listLength: list.length,
      onScroll: $.onScroll
    })

  /** 首帧渲染空数据, 让列表容器与 cell 分两批挂载 (同批挂载的 cell 会被 skipEntering 跳过进场动画) */
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

  const elEmpty = useMemo(() => <Empty />, [])

  /** web 列表不渲染 ListEmptyComponent, 空态挂在头部 */
  const elHeader = useMemo(
    () => (
      <View onLayout={handleHeaderLayout}>
        <Info />
        {WEB ? <Empty /> : null}
      </View>
    ),
    [handleHeaderLayout]
  )

  const handleRenderItem = useCallback(
    ({ item, index }: RenderItem<GroupItem>) => (
      <Item {...item} index={index} group={group} showLastDate={showLastDate} />
    ),
    [group, showLastDate]
  )

  /** GroupItem 没有 id, 通用 keyExtractor 会全部返回空串, 导致 cell 复用且进场动画失效 */
  const handleKeyExtractor = useCallback((item: GroupItem) => item.href, [])

  return (
    <ListView
      ref={handleRef}
      contentContainerStyle={styles.container}
      keyExtractor={handleKeyExtractor}
      skipEnteringExitingAnimations={ENTERING_ANIMATIONS_NUM}
      data={ready ? $.group : (LIST_EMPTY as Group)}
      ListHeaderComponent={elHeader}
      ListEmptyComponent={elEmpty}
      onContentSizeChange={handleContentSizeChange}
      renderItem={handleRenderItem}
      showFooter={false}
      onScroll={handleScroll}
    />
  )
}

export default observer(List)
