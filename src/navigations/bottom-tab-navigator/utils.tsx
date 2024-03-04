/*
 * @Author: czy0729
 * @Date: 2024-03-04 17:17:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-04 17:20:03
 */
import { systemStore } from '@stores'
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
