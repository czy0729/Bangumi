/*
 * @Author: czy0729
 * @Date: 2020-10-06 16:42:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-04 17:34:53
 */
import React, { useMemo } from 'react'
import { SceneMap } from 'react-native-tab-view'
import { BlurViewTab } from '@_'
import { r } from '@utils/dev'
import { TABS_ITEM } from '../../ds'
import List from '../list'
import BlurView from './blur-view'
import Tab from './tab'
import { COMPONENT } from './ds'
import { Props } from './types'

function TabWrap({ keys }: Props) {
  r(COMPONENT)

  const renderScene = useMemo(() => {
    const routes: Record<string, React.ComponentType> = {}
    keys.forEach(item => {
      routes[item] = () => <List title={TABS_ITEM[item].title} />
    })
    return SceneMap(routes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys.join()])

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

export default TabWrap
