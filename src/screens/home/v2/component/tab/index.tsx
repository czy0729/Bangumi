/*
 * @Author: czy0729
 * @Date: 2020-10-06 16:42:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-22 12:00:00
 *
 * 首页标签页容器: 按可用 Tab 数量选择 TabView / 单列表
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { SceneMap } from '@components'
import { BlurViewTab } from '@_'
import { r } from '@utils/dev'
import { TABS_ITEM } from '../../ds'
import List from '../list'
import BlurView from './blur-view'
import Tab from './tab'
import { COMPONENT } from './ds'

import type { ComponentType } from 'react'
import type { Props } from './types'

function TabWrap({ keys }: Props) {
  r(COMPONENT)

  const renderScene = useMemo(() => {
    const routes: Record<string, ComponentType> = {}
    keys.forEach(item => {
      routes[item] = () => <List title={TABS_ITEM[item].title} />
    })

    return SceneMap(routes)
  }, [keys])

  const { length } = keys

  return (
    <BlurView>
      {length >= 2 ? (
        <Tab renderScene={renderScene} />
      ) : length === 1 ? (
        <>
          <List title={TABS_ITEM[keys[0]].title} />
          <BlurViewTab />
        </>
      ) : (
        <>
          <List title='动画' />
          <BlurViewTab />
        </>
      )}
    </BlurView>
  )
}

export default observer(TabWrap)
