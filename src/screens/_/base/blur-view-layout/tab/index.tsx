/*
 * @Author: czy0729
 * @Date: 2023-08-10 04:26:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 16:49:58
 */
import { observer } from 'mobx-react'
import { HardwareTextureBlurView } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useInsets } from '@utils/hooks'
import { COMPONENT, H_TABBAR } from './ds'
import { memoStyles } from './styles'

/**
 * TabView 顶部的毛玻璃背景 (iOS)
 *  - 作为 Pager 的上层覆盖层, 不随内部内容移动, 宽度与容器等宽即可
 *  - 绝对定位必须同时给出 left 与 right, 否则 Yoga 会退化成内容测量导致宽度为 0
 */
export const BlurViewTab = observer(({ length = 0 }) => {
  r(COMPONENT)

  const { headerHeight, statusBarHeight } = useInsets()

  const styles = memoStyles()

  return (
    <HardwareTextureBlurView
      style={stl(
        styles.ios,
        {
          top: (-statusBarHeight || 0) + _.device(0, 24),
          height: headerHeight + H_TABBAR + (statusBarHeight || 0)
        },
        length <= 1 && {
          height: headerHeight + _.sm + _.device(-statusBarHeight || 0, 0)
        }
      )}
    />
  )
})

export default BlurViewTab
