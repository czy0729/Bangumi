/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 12:30:00
 */
import { useCallback } from 'react'
import { RefreshControl } from 'react-native'
import { _ } from '@stores'
import { date, simpleTime } from '@utils'
import { REFRESH_STATE } from '../ds'

import type { ReactElement } from 'react'
import type { UseRenderRefreshControlOptions } from './types'

/**
 * 渲染下拉刷新控制
 * 未绑定头部刷新回调时返回 null
 */
export function useRenderRefreshControl<ItemT>(options: UseRenderRefreshControlOptions<ItemT>) {
  const {
    rawOnHeaderRefresh,
    refreshState,
    data,
    progressViewOffset,
    refreshControlProps,
    onHeaderRefresh
  } = options

  return useCallback((): ReactElement | null => {
    if (!rawOnHeaderRefresh) return null

    return (
      <RefreshControl
        enabled={!!rawOnHeaderRefresh}
        refreshing={refreshState === REFRESH_STATE.HeaderRefreshing}
        title={data._loaded ? `上次刷新时间: ${simpleTime(date(String(data._loaded)))}` : undefined}
        colors={[_.colorMain]}
        titleColor={_.colorSub}
        tintColor={_.colorSub}
        progressViewOffset={progressViewOffset}
        progressBackgroundColor={_.select(_.colorPlain, _._colorDarkModeLevel2)}
        onRefresh={onHeaderRefresh}
        {...refreshControlProps}
      />
    )
  }, [
    rawOnHeaderRefresh,
    refreshState,
    data,
    progressViewOffset,
    refreshControlProps,
    onHeaderRefresh
  ])
}
