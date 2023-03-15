/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-15 19:48:29
 */
import React from 'react'
import TabView from '@components/@/react-native-tab-view/TabView'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import TabBar from './tab-bar'
import TabBarLabel from './tab-bar-label'
import { Ctx } from '../types'
import { renderScene } from './ds'
import { styles } from './styles'

function Tab(props, { $ }: Ctx) {
  const { _loaded } = $.state
  if (!_loaded) return null

  return (
    <TabView
      key={_.orientation}
      style={_.mt._sm}
      sceneContainerStyle={styles.sceneContainerStyle}
      lazy={!IOS}
      lazyPreloadDistance={0}
      navigationState={$.navigationState}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={$.onChange}
    />
  )
}

export default obc(Tab)

function renderTabBar(props) {
  return <TabBar {...props} renderLabel={renderLabel} />
}

function renderLabel({ route, focused }) {
  return <TabBarLabel route={route} focused={focused} />
}
