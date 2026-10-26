/*
 * @Author: czy0729
 * @Date: 2024-06-05 20:47:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-26 00:00:00
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { Flex, Mesume, Text } from '@components'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { ListViewScrollMethods } from '@components'
import type { GroupItem } from '@stores/rakuen/types'
import type { Ctx } from '../../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { replyPage } = $.state
  const { list, _loaded } = $.myReply

  const listRef = useRef<ListViewScrollMethods | null>(null)

  /** 只在实例非空时保存, 避免 ref 卸载回调把引用清掉 */
  const handleRef = useCallback((ref: unknown) => {
    if (ref) listRef.current = ref as ListViewScrollMethods
  }, [])

  /** 新页未加载时保留上一页内容, 避免列表闪空 */
  const [stableList, setStableList] = useState<GroupItem[]>(list)
  useEffect(() => {
    if (_loaded) setStableList(list)
  }, [list, _loaded])

  /** 翻页后等新页数据落地再回顶, 避免旧内容先滚再整屏替换 */
  const lastPageRef = useRef(replyPage)
  const pendingPageRef = useRef<number | null>(null)
  useEffect(() => {
    if (lastPageRef.current === replyPage) return

    lastPageRef.current = replyPage
    pendingPageRef.current = replyPage
  }, [replyPage])

  useEffect(() => {
    if (pendingPageRef.current === null || !_loaded) return

    pendingPageRef.current = null
    const timer = setTimeout(() => {
      listRef.current?.scrollToOffset?.({
        offset: 0,
        animated: false
      })
    }, 0)

    return () => clearTimeout(timer)
  }, [_loaded, list])

  /** 空态会卸载列表, 清掉旧实例避免滚动打在已卸载的 FlatList 上 */
  const isEmpty = _loaded && !stableList.length
  useEffect(() => {
    if (isEmpty) listRef.current = null
  }, [isEmpty])

  if (isEmpty) {
    return (
      <Flex style={styles.empty} direction='column' justify='center'>
        <Mesume />
        <Text style={_.mt.sm} type='sub'>
          好像什么都没有
        </Text>
      </Flex>
    )
  }

  return (
    <PaginationList
      forwardRef={handleRef}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={stableList}
      limit={7}
      skipEnteringExitingAnimations={7}
      renderItem={renderItem}
    />
  )
}

export default observer(List)
