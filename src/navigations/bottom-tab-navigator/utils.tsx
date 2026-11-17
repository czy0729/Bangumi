/*
 * @Author: czy0729
 * @Date: 2024-03-04 17:17:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-06 17:47:41
 */
import { systemStore } from '@stores'
import { Discovery, Home, Rakuen, Timeline, Tinygrail, User } from '@screens'
import { INIT_ROUTE } from '@src/config'
import TabBar from '../tab-bar'
import { BOTTOM_TABS } from '../tab-bar/config'

export const renderTabBar = (props: any) => <TabBar {...props} />

/** Tab 名 → 屏幕组件 */
const TAB_COMPONENTS = {
  Discovery,
  Timeline,
  Home,
  Rakuen,
  User,
  Tinygrail
}

/** 启动默认 BottomTab 路由 */
export function getInitialRouteName() {
  const initialPage = systemStore.setting.initialPage || INIT_ROUTE
  let initialRouteName = systemStore.setting.homeRenderTabs.includes(initialPage)
    ? initialPage
    : INIT_ROUTE
  if (!systemStore.setting.tinygrail && initialRouteName === 'Tinygrail') {
    initialRouteName = INIT_ROUTE
  }
  return initialRouteName
}

/** 由 BOTTOM_TABS 派生屏幕挂载配置 (顺序即展示顺序, 显示条件与初始参数在此层注入) */
export const getTabConfig = (isTinygrailEnabled: boolean) =>
  BOTTOM_TABS.map(tab => ({
    name: tab.name,
    component: TAB_COMPONENTS[tab.name],
    showCondition: (homeRenderTabs: string[]) =>
      tab.fixed ||
      (tab.name === 'Tinygrail'
        ? homeRenderTabs.includes(tab.name) && isTinygrailEnabled
        : homeRenderTabs.includes(tab.name)),
    initialParams: tab.name === 'Tinygrail' ? { fromBottomTab: true } : undefined
  }))
