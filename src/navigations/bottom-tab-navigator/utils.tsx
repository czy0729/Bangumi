/*
 * @Author: czy0729
 * @Date: 2024-03-04 17:17:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-06 17:47:41
 */
import React from 'react'
import { systemStore } from '@stores'
import { Discovery, Home, Rakuen, Timeline, Tinygrail, User } from '@screens'
import TabBar from '../tab-bar'

export const renderTabBar = (props: any) => <TabBar {...props} />

/** 启动默认 BottomTab 路由 */
export function getInitialRouteName() {
  const initialPage = systemStore.setting.initialPage || 'Home'
  let initialRouteName = systemStore.setting.homeRenderTabs.includes(initialPage)
    ? initialPage
    : 'Home'
  if (!systemStore.setting.tinygrail && initialRouteName === 'Tinygrail') initialRouteName = 'Home'
  return initialRouteName
}

export const getTabConfig = (isTinygrailEnabled: boolean) => [
  {
    name: 'Discovery',
    component: Discovery,
    showCondition: (homeRenderTabs: string[]) => homeRenderTabs.includes('Discovery')
  },
  {
    name: 'Timeline',
    component: Timeline,
    showCondition: (homeRenderTabs: string[]) => homeRenderTabs.includes('Timeline')
  },
  {
    name: 'Home',
    component: Home,
    showCondition: () => true
  },
  {
    name: 'Rakuen',
    component: Rakuen,
    showCondition: (homeRenderTabs: string[]) => homeRenderTabs.includes('Rakuen')
  },
  {
    name: 'User',
    component: User,
    showCondition: () => true
  },
  {
    name: 'Tinygrail',
    component: Tinygrail,
    showCondition: (homeRenderTabs: string[]) =>
      homeRenderTabs.includes('Tinygrail') && isTinygrailEnabled,
    initialParams: {
      fromBottomTab: true
    }
  }
]
