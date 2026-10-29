/*
 * @Author: czy0729
 * @Date: 2019-05-15 15:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 *
 * 搜索结果列表
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { ListView, Text } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { r } from '@utils/dev'
import Item from '../item'
import { COMPONENT, ENTERING_ANIMATIONS_NUM } from './ds'

import type { RakuenSearchItem } from '@stores/search/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  r(COMPONENT)

  const { _loaded, _filter = 0 } = $.search

  const handleRenderItem = useCallback(
    ({ item, index }: RenderItem<RakuenSearchItem>) => <Item index={index} {...item} />,
    []
  )

  /** 非会员不能翻页的提示 */
  const elFooter = useMemo(
    () =>
      _filter > 0 ? (
        <>
          <Text style={_.mt.lg} type='sub' align='center' size={13} bold>
            非会员仅显示第 1 页
          </Text>
          <Text style={_.mt.xs} type='sub' align='center' size={13} bold>
            高级会员可继续翻页
          </Text>
        </>
      ) : undefined,
    [_filter]
  )

  if (!_loaded) return null

  return (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      skipEnteringExitingAnimations={ENTERING_ANIMATIONS_NUM}
      data={$.search}
      renderItem={handleRenderItem}
      ListFooterComponent={elFooter}
      onScroll={$.onScroll}
      onFooterRefresh={$.onFooterRefresh}
    />
  )
}

export default observer(List)
