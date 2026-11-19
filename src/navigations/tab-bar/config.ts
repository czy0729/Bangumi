/*
 * @Author: czy0729
 * @Date: 2022-03-10 02:30:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 12:00:00
 */

import { BOTTOM_TAB_LABEL } from '@constants/data/tab'

/**
 * 底部 Tab 结构与顺序配置 (文案见 constants/data/tab)
 *  - 顺序即展示顺序 (bottom-tab-navigator 按此派生屏幕挂载)
 *  - fixed: true 不受 homeRenderTabs 设置控制, 恒显示
 */
export const BOTTOM_TABS = [
  {
    name: 'Discovery',
    icon: 'home',
    size: 19,
    label: BOTTOM_TAB_LABEL.Discovery,
    fixed: false
  },
  {
    name: 'Timeline',
    icon: 'md-access-time',
    size: 21,
    label: BOTTOM_TAB_LABEL.Timeline,
    fixed: false
  },
  {
    name: 'Home',
    icon: 'md-star-outline',
    size: undefined,
    label: BOTTOM_TAB_LABEL.Home,
    fixed: true
  },
  {
    name: 'Rakuen',
    icon: 'md-chat-bubble-outline',
    size: 19,
    label: BOTTOM_TAB_LABEL.Rakuen,
    fixed: false
  },
  {
    name: 'User',
    icon: 'md-person-outline',
    size: undefined,
    label: BOTTOM_TAB_LABEL.User,
    fixed: true
  },
  {
    name: 'Tinygrail',
    icon: 'trophy',
    size: 19,
    label: BOTTOM_TAB_LABEL.Tinygrail,
    fixed: false
  }
] as const

/** 按路由名索引的显示配置 (TabBar 渲染用) */
export const TAB_CONFIG_BY_NAME: { [key: string]: (typeof BOTTOM_TABS)[number] } =
  Object.fromEntries(BOTTOM_TABS.map(item => [item.name, item]))
