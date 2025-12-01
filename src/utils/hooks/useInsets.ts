/*
 * @Author: czy0729
 * @Date: 2025-12-01 18:14:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-01 18:49:23
 */
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { IOS, PAD, WEB, WSA } from '@constants'
import { IS_IOS_5_6_7_8 } from '@styles/layout'

/** 最大头部高度 */
const MAX_HEADER_HEIGHT = WEB ? 48 : 80

function useInsets() {
  const edgeInsets = useSafeAreaInsets()

  const statusBarHeight = edgeInsets.top

  /** 头部高度 (顶部 Tab) */
  const appBarHeight = IOS ? statusBarHeight : 56 - (WSA ? statusBarHeight : 0)

  /**
   * 整个头部高度 (状态栏高度 + 头部高度)
   *  - iOS 8 以前的设备 statusBarHeight 获取不好, 需要手动添加一个固定高度
   *  - Pad 固定最大 80
   *  - Web 固定最大 48
   *  - 安卓没影响
   * */
  const headerHeight = Math.max(
    MAX_HEADER_HEIGHT,
    (PAD
      ? Math.max(appBarHeight + statusBarHeight, MAX_HEADER_HEIGHT)
      : appBarHeight + statusBarHeight) + (IOS ? (IS_IOS_5_6_7_8 ? 28 : 0) : 0)
  )

  return {
    ...edgeInsets,
    statusBarHeight,
    appBarHeight,
    headerHeight
  }
}

export default useInsets
