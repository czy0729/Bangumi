/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:39:06
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useInsets } from '@utils/hooks'
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

  const { headerHeight } = useInsets()

  const isSingleTab = $.tabs.length <= 1
  const basePadding = headerHeight + (isSingleTab ? _.sm : H_TABBAR)
  const iosPadAdjustment = IOS && PAD ? (isSingleTab ? 2 : 14) : 0
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
}

export default observer(ListWrap)
