/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:52:27
 */
import React, { useCallback, useMemo } from 'react'
import { Loading } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { MODEL_SETTING_HOME_LAYOUT } from '@constants'
import Grid from '../grid/index.lazy'
import List from './list'
import { COMPONENT } from './ds'

import type { ScrollToIndex } from '@components'
import type { Ctx } from '../../types'
import type { Props } from './types'

function ListWrap({ title = '全部' }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const style = useMemo(
    () => ({
      paddingTop: $.listPaddingTop,
      paddingBottom: _.bottom
    }),
    [$.listPaddingTop]
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
