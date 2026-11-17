/*
 * @Author: czy0729
 * @Date: 2022-03-10 02:30:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-13 12:20:42
 */

/**
 * 底部 Tab 唯一配置源
 *  - 顺序即展示顺序 (bottom-tab-navigator 按此派生屏幕挂载)
 *  - fixed: true 不受 homeRenderTabs 设置控制, 恒显示
 */
export const BOTTOM_TABS = [
  {
    name: 'Discovery',
    icon: 'home',
    size: 19,
    label: '发现',
    fixed: false
  },
  {
    name: 'Timeline',
    icon: 'md-access-time',
    size: 21,
    label: '时间胶囊',
    fixed: false
  },
  {
    name: 'Home',
    icon: 'md-star-outline',
    size: undefined,
    label: '收藏',
    fixed: true
  },
  {
    name: 'Rakuen',
    icon: 'md-chat-bubble-outline',
    size: 19,
    label: '超展开',
    fixed: false
  },
  {
    name: 'User',
    icon: 'md-person-outline',
    size: undefined,
    label: '时光机',
    fixed: true
  },
  {
    name: 'Tinygrail',
    icon: 'trophy',
    size: 19,
    label: '小圣杯',
    fixed: false
  }
] as const

/** 按路由名索引的显示配置 (TabBar 渲染用) */
export const TAB_CONFIG_BY_NAME: { [key: string]: (typeof BOTTOM_TABS)[number] } =
  Object.fromEntries(BOTTOM_TABS.map(item => [item.name, item]))
