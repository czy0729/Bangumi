/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 18:11:59
 */
import { useEffect, useMemo } from 'react'
import { _, useStoreContextBridge } from '@stores'
import { useNavigation } from '@utils/hooks'
import { getHeaderTitleAlign, getHeaderTitleStyle } from './utils'
import { COMPONENT } from './ds'

import type { UseHeaderV2Options, UseHeaderV2Result } from './types'

/** HeaderV2 头部逻辑 */
export function useHeaderV2({
  headerRight,
  headerTitleAlign,
  headerTitleStyle
}: UseHeaderV2Options): UseHeaderV2Result {
  const navigation = useNavigation(COMPONENT)
  const bridge = useStoreContextBridge()

  /**
   * 原生头部渲染 headerRight 时位于 StoreContext.Provider 之外,
   * 需要包一层 Provider, 否则内部的 useStore 拿不到页面状态机
   */
  const bridgedHeaderRight = useMemo(() => {
    if (!headerRight) return headerRight
    return bridge(headerRight)
  }, [headerRight, bridge])

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: false,
      headerShadowVisible: false,
      headerRight: bridgedHeaderRight
    })
  }, [navigation, bridgedHeaderRight])

  const headerTitleAlignValue = getHeaderTitleAlign(headerTitleAlign, _.isPad)

  const headerTitleStyleValue = useMemo(
    () => getHeaderTitleStyle(headerTitleStyle, _.isPad),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [headerTitleStyle, _.isPad]
  )

  return { bridgedHeaderRight, headerTitleAlignValue, headerTitleStyleValue }
}
