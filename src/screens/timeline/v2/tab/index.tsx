/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-18 18:02:04
 */
import React from 'react'
import { View } from 'react-native'
import { TabView } from '@components'
import { BlurView } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import { Ctx } from '../types'
import TabBar from './tab-bar'
import TabBarLeft from './tab-bar-left'
import renderScene from './renderScene'
import { memoStyles } from './styles'

function Tab(props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <>
      <TabView
        key={_.orientation}
        style={_.mt._sm}
        sceneContainerStyle={styles.sceneContainerStyle}
        lazy
        lazyPreloadDistance={0}
        navigationState={$.navigationState}
        renderTabBar={renderTabBar}
        renderSceneHeaderComponent={IOS && <BlurView style={styles.blurView} />}
        renderScene={renderScene}
        onIndexChange={$.onChange}
      />
      <View style={styles.tabBarLeft}>
        <TabBarLeft />
      </View>
    </>
  )
}

export default obc(Tab)

function renderTabBar(props) {
  return <TabBar {...props} />
}
