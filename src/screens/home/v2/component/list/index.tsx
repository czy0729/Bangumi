/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 02:36:30
 */
import React, { useCallback, useMemo } from 'react'
import { Loading } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useInsets, useObserver } from '@utils/hooks'
import { IOS, MODEL_SETTING_HOME_LAYOUT, PAD } from '@constants'
import { H_TABBAR } from '../../ds'
import Grid from '../grid/index.lazy'
import List from './list'
import { COMPONENT } from './ds'

import type { ScrollToIndex } from '@components'
import type { Ctx } from '../../types'
import type { Props } from './types'

function ListWrap({ title = '全部' }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerHeight, statusBarHeight } = useInsets()

  const basePadding = headerHeight + ($.tabs.length <= 1 ? _.sm : H_TABBAR)
  const iosPadAdjustment = IOS && PAD ? statusBarHeight : 0
  const paddingTop = basePadding + iosPadAdjustment

  const style = useMemo(
    () => ({
      paddingTop,
      paddingBottom: _.bottom
    }),
    [paddingTop]
  )

  const handleForwardRef = useCallback(
    (ref: { scrollToIndex: ScrollToIndex }) => $.forwardRef(ref, title),
    [$, title]
  )

  return useObserver(() => {
    if (systemStore.setting.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('网格')) {
      return <Grid title={title} />
    }

    if (!$.collection._loaded) return <Loading />

    const showItem = $.showItem(title)
    if (!showItem) return null

    return (
      <List
        forwardRef={handleForwardRef}
        style={style}
        data={$.currentCollection(title)}
        title={title}
        showItem={showItem}
        onScroll={$.onScroll}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={title === '游戏' ? $.onFooterRefresh : undefined}
      />
    )
  })
}

export default ListWrap
